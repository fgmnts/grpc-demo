const path = require('path');
const shell = require('shelljs');
const rimraf = require('rimraf');

// https://github.com/shelljs/shelljs/issues/469
process.env.PATH += (path.delimiter + path.join(process.cwd(), 'node_modules', '.bin'));

const PROTO_DIR = path.join(__dirname, '../protos');
const MODEL_DIR = path.join(__dirname, '../src/models');
const PROTOC_PATH = path.join(__dirname, "../node_modules/grpc-tools/bin/protoc");
const PLUGIN_PATH = path.join(__dirname, "../node_modules/.bin/protoc-gen-ts_proto");

rimraf.sync(`${MODEL_DIR}/*`, {
  glob: { ignore: `${MODEL_DIR}/tsconfig.json` },
});

const protoConfigTs = [
  `--plugin=${PLUGIN_PATH}`,

  // https://github.com/stephenh/ts-proto/blob/main/README.markdown
  "--ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=true,exportCommonSymbols=false,esModuleInterop=true",

  `--ts_proto_out=${MODEL_DIR}`,
  `--proto_path ${PROTO_DIR} ${PROTO_DIR}/*.proto`,
];
// https://github.com/stephenh/ts-proto#usage
shell.exec(`${PROTOC_PATH} ${protoConfigTs.join(" ")}`, (code, stdout, stderr) => console.log(code, stdout, stderr));



// shell.exec(`python3 -m grpc_tools.protoc --proto_path=protos --python_out=dist_py --grpc_python_out=dist_py protos/addition.proto`, (code, stdout, stderr) => console.log(code, stdout, stderr));
// shell.exec(`protoc -I=protos --csharp_out=dist_cs protos/addition.proto`, (code, stdout, stderr) => console.log(code, stdout, stderr));

// console.log(`${PROTOC_PATH} ${protoConfigTs.join(" ")}`)
// console.log(`python3 -m grpc_tools.protoc --proto_path=protos --python_out=dist_py --grpc_python_out=dist_py protos/addition.proto`)
// console.log(`protoc -I=protos --csharp_out=dist_cs protos/addition.proto`)

// protoc -I=protos --csharp_out=dist_cs protos/addition.proto 
// protoc --proto_path=./proto/ --plugin=protoc-gen-zsharp=protoc-gen-zsharp --zsharp_out=./out ./proto/example.proto

// python3 -m grpc_tools.protoc --proto_path=protos --python_out=dist_py --grpc_python_out=dist_py protos/addition.proto


// protoc --plugin=node_modules/.bin/protoc-gen-ts_proto --ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=true,exportCommonSymbols=false,esModuleInterop=true --ts_proto_out=src/models --proto_path=protos protos/addition.proto
// python3 -m grpc_tools.protoc --proto_path=protos --python_out=dist_py --grpc_python_out=dist_py protos/addition.proto
// python3 -m grpc_tools.protoc --proto_path=protos --csharp_out=dist_cs --grpc_csharp_out=dist_cs protos/addition.proto
// protoc -I=protos --csharp_out=dist_cs --grpc_csharp_out=dist_cs protos/addition.proto
// protoc -I=protos --js_out=import_style=commonjs:dist_js protos/addition.proto



//protoc --plugin=node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=src/models --proto_path=protos protos/addition.proto --ts_proto_opt=outputServices=grpc-js,env=node,useOptionals=true,exportCommonSymbols=false,esModuleInterop=true 
//

// C:\Users\pieter-jan.beeckma1\Downloads\protoc-3.19.1-win64\bin\protoc.exe -I protos --csharp_out dist_cs protos/addition.proto --grpc_out dist_cs --plugin=protoc-gen-grpc=grpc_csharp_plugin.exe