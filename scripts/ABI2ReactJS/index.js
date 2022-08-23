const fs = require("fs");

function getInOrOut(inputs, method) {
    let out = '';
    for (let i = 0; i < inputs.length; i++) {

      if (inputs[i].name) {
          if(inputs[i].name != ""){
            out += `${inputs[i].name}`;
          }
      }

      if (i !== inputs.length - 1) {
          if(method.stateMutability === "view"){
              if(inputs[i].name == ""){
                out += `var${i}, `;
              }else{
                out += ', ';
              }
            
          }else{
            out += ', ';
          }
      }else{
        if(method.stateMutability === "view"){
            if(inputs[i].name == ""){
                out += `var${i}`
            }
        }
      }
    }

    if(method.stateMutability == "payable"){
        out += `, _value`;
    }

    return out;
}

function setupViewVars(inputs, method) {
    let out = '';
    for (let i = 0; i < inputs.length; i++) {

        if (i !== inputs.length - 1) {
            if(method.stateMutability === "view"){
              if(inputs[i].name == ""){
                out += `var${i}, `;
              }else{
                // account == null ? this.account : account
                out += `${inputs[i].name}, `;
              }
            }
        }else{
            if(method.stateMutability === "view"){
                if(inputs[i].name == ""){
                    out += `var${i}`
                }else{
                  out += `${inputs[i].name}`;
                }
            }
        }

    }
    return out;
}

function setupVars(inputs, method) {
    let out = '';
    for (let i = 0; i < inputs.length; i++) {

      if (inputs[i].name) {
          if(inputs[i].name != ""){
            out += `${inputs[i].name}`;
          }
      }

      if (i !== inputs.length - 1) {
          if(method.stateMutability !== "view"){
              if(inputs[i].name != ""){
                out += ', ';
              }
            
          }
      }
    }
    return out;
}
  
function getMethodInterface(method) {
    const out = [];

    // Type
    if (method.type !== 'function') {
      return null;
    }
    out.push("\nasync");
    // Name
    if (method.name) {
      out.push(method.name);
    }
    // Inputs
    out.push('(');
    out.push(getInOrOut(method.inputs, method));
    out.push(')');

    out.push('{\n');
    out.push(
    `   try{\n`
        );

    // Function Content
    if (method.stateMutability === 'view') {
    out.push(
    `       let res = await this.Contract.${method.name}(`
    );
    out.push(setupViewVars(method.inputs, method));
    out.push(`).call();
        return res;\n`
    );

    out.push(
        `   }catch(err){
            console.error('[${method.name}Services] - ${method.name}' + err);
        }`);

    }else{

    out.push(
    `       await this.Contract.${method.name}(`
    );
    out.push(setupVars(method.inputs, method));
    out.push(`).send({
            from: this.account${method.stateMutability == "payable" ? ", value: _value" : ""}
        });
        return true;\n`
    );

    out.push(
        `   }catch(err){
        console.error('[${method.name}Services] - ${method.name}' + err);
        return false
    }`);
    }
    

    out.push(`\n}`);

    // Outputs
    // if (method.outputs && method.outputs.length > 0) {
    //   out.push('returns');
    //   out.push('(');
    //   out.push(getInOrOut(method.outputs));
    //   out.push(')');
    // }
    return out.join(' ');
  }

  function ABI2JsClass(file) {
    var impor_web3 = 'import Web3 from "web3";';
    var import_address = 'import {'+file.contractName+'_ADDRESS, RPC} from "../Constants/Constants.js";\n';
    var require_abi = 'const '+file.contractName+'_ABI = require("' + '../ABI/'+ file.contractName + '.json");\n\n';
    var HEADER = 'export class '+file.contractName+'{\n';
    HEADER += `
    constructor(provider, account){
        if(provider == undefined){
          this.web3 = new Web3(RPC);
        }else{
          this.web3 = new Web3(provider);
        }
        this.account = account;
        this.Contract = new this.web3.eth.Contract(${file.contractName}_ABI, ${file.contractName}_ADDRESS).methods;
    }\n\n
    `;
    
    const FOOTER = '}\n';
    const jsonABI = JSON.parse(JSON.stringify(file.abi));
    let out = impor_web3 + import_address + require_abi + HEADER;
    for (let i = 0; i < jsonABI.length; i += 1) {
      const method = jsonABI[i];
      const methodString = getMethodInterface(method);
      if (methodString) {
        out += `  ${getMethodInterface(method)};\n\n`;
      }
    }
    return out + FOOTER;
}

function ExportABI(addresses){
    fs.readdirSync('./artifacts/contracts/').forEach(dir => {
      fs.readdirSync('./artifacts/contracts/'+dir).forEach(file => {

        addresses.map(address=>{
          if(address.name+".json" == file){
            const File = fs.readFileSync('./artifacts/contracts/'+dir+"/"+file);
            const abi = JSON.parse(File).abi;
            fs.writeFileSync("./scripts/ABI2ReactJs/Export/ABI/"+file, JSON.stringify(abi));
          }
        })
        
    });
  });

    
}

function BuildConstants(addresses){
  var Constants = '';

  for(let i=0; i<addresses.length; i++){
    Constants += 'const '+addresses[i].name+"_ADDRESS = '"+addresses[i].address+"';\n";
  }
  Constants += "\nconst RPC = 'http://127.0.0.1:8545/';\n"
  Constants += "\nexport {";

  for(let i=0; i<addresses.length; i++){
    if(i < addresses.length-1){
      Constants += addresses[i].name+"_ADDRESS, ";
    }else{
      Constants += addresses[i].name+"_ADDRESS";
    }
    
  }

  Constants += ", RPC}";

  fs.writeFileSync("./scripts/ABI2ReactJs/Export/Constants/Constants.js", Constants);
}

module.exports = function BuildFiles(addresses){
    ExportABI(addresses);
    BuildConstants(addresses);

    fs.readdirSync('./artifacts/contracts/').forEach(dir => {
      fs.readdirSync('./artifacts/contracts/'+dir).forEach(file => {
        addresses.map(address=>{
          if(address.name+".json" == file){
            const File = fs.readFileSync('./artifacts/contracts/'+dir+"/"+file);
            const filename = file.replace(/\.[^/.]+$/, "")+"Services";
            fs.writeFileSync("./scripts/ABI2ReactJs/Export/Contracts/"+filename+".js", ABI2JsClass(JSON.parse(File)),{encoding:'utf8',flag:'w+'});
          }
        })
      })
    });
}
