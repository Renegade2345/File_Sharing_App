


const socket = io()


const uploadFile = ()=>{
    const fileInput = document.getElementById("fileInput")
    const file = fileInput.files[0]
    if(file){
        const formData = new FormData()
        formData.append("file", file)
        fetch("/api/v1/upload",{
            method:"POST",
            body:formData
        })
        .then((response)=>response.json())
        .then((data)=>{
            alert(data.message)
        }).catch((err)=> alert(err.message))

    }else{
        alert("please select a file")
    }
}
    
const downloadFile = (filename) =>{
    fetch(`/api/v1/download/${filename}`).then((response)=>response.blob()).then((blob)=>{
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL()
        console.log(url)
    })

}

const updateFileList = (files) =>{
    const FilelistElement = document.getElementById("fileList")
    FilelistElement.innerHTML = ''

    files.forEach((file)=>{
        const divElem =  document.createElement("div")
        const  spanElem = document.createElement("span")
        spanElem.textContent = file.fileName

        const downloadButton = document.createElement("button")

        downloadButton.classList.add("download-btn")
        downloadButton.textContent = "Download"
        downloadButton.onclick =  ()=>{
            downloadFile(file.fileName)
        }
        divElem.appendChild(spanElem)
        divElem.appendChild(downloadButton)   
        FilelistElement.appendChild(divElem)
    })
}








socket.on("updateFileList", (files)=>{
    console.log(files)
})

socket.on("updateFileList", (files) => {
    console.log(files);
    updateFileList(files);
});