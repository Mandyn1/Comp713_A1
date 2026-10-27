import path from "path";
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

function getProto(protoName:string){
    const protoPath = path.join(__dirname,'../../protos/', protoName + '.proto');

    //Format grpc
    const packageDefinition = protoLoader.loadSync(protoPath, { keepCase: true, defaults: true });
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as any;
    const protoPackage = protoDescriptor[protoName];

    return protoPackage;
}

const helperFunction = {getProto};

export default helperFunction;
