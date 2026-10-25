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

function reconstructMatrix(array:any[], rowCount:number, colCount:number){
    let matrix: any[][] = Array.from({ length: rowCount }, () => 
        Array(colCount).fill(0)
    );
    for(let i = 0; i < rowCount; i++){
        for(let j = 0; j < colCount; j++){
            matrix[i][j] = array[i * j + j];
        }
    }

    return matrix;
}

const helperFunction = {getProto, reconstructMatrix};

export default helperFunction;
