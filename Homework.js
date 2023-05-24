const fs=require("fs").promises;
const http=require("http");

http.createServer(async(req,res)=>
{
res.setHeader("Content-Type","aplication/json");
let data =await fs.readFile(process.cwd()+ "/Baza.json", "utf8")
let Database=data ? JSON.parse(data) : [];

if (req.url==="/show"  && req.method==="GET")   //------------http://localhost:700/show
{
res.end(JSON.stringify(Database));
}
else if(req.url==="/create" && req.method==="POST")  //--------------http://localhost:700/create 
{
 req.on("data", async (data)=>{
   const newdata=JSON.parse(data);
   let bool1=true
   let i=0;
   while(i<Database.length && (Database[i].name===newdata.name))
   {
        Database[i].value +=newdata.value;
       await fs.writeFile(process.cwd()+"/baza.json", JSON.stringify(Database , null, 2), "utf8");
       res.end("Bunday maxsulot bor");
       bool1=false;
       i+=1;
   }
   if(bool1)
   {
     newdata.id=(Database[Database.length-1]?.id || 0) +1
     Database.push(newdata)
     await fs.writeFile(process.cwd()+"/Baza.json", JSON.stringify(Database , null, 2))
     res.end("Yangi tovar qo'shildi")
   }
 })
}
else if(req.url==="/remove" && req.method==="DELETE")  // -----------http://localhost:700/remove
{
 req.on("data", async (data)=>{
   const newdata=JSON.parse(data)
   let bool2=true;
   let j=0;
   while(j<Database.length && (Database[j].id===newdata.id))
   {
       Database.splice(id-1, 1)
       await fs.writeFile(process.cwd()+"/Baza.json", JSON.stringify(Database , null, 2), "utf8")
       res.end(`id: ${newdata.id} bo'lgani o'chirildi `)
       bool2=false
       j+=1;
   }
   if(bool2){
     res.end( ` id: ${newdata.id} teng bo'lgani yoq`)
   }
 })
}

}).listen(700,()=>console.log("Server connet port:700"));