  import { S3Client, ListObjectsCommand } from "@aws-sdk/client-s3";

  const s3Client = new S3Client({ region: "us-east-1" }); 
  const bucketName = "s3-client-121212";
  const prefixoDesejado = "./testes"; 

const listarNomesDeArquivos = async () => {
  const params = {
    Bucket: bucketName,
    Prefix: prefixoDesejado,
    MaxKeys: 10, 
  };

  try {
    const data = await s3Client.send(new ListObjectsCommand(params));
    
    if (data.Contents) {
      console.log("Nomes dos arquivos encontrados:");
      data.Contents.forEach((objeto) => {
        console.log(objeto.Key);
      });
    } else {
      console.log("Nenhum arquivo encontrado com o prefixo especificado.");
    }
  } catch (err) {
    console.error("Erro ao listar objetos do S3:", err);
  }
};

listarNomesDeArquivos();