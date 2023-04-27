const allMidDivs = document.getElementsByClassName("midDiv") 
const allUpperDiv = document.getElementsByClassName("upperDiv")
const allLeftColumnsTextarea = document.getElementsByClassName("leftInputColumn")
const allRightColumnsTextarea = document.getElementsByClassName("rightInputColumn")

// var toolbarButtonCounter = 0;
const tb1 = document.querySelector(".tb1")
var sel = 0 
const getQlEditor = document.getElementsByClassName("ql-editor")
var fixedColumn = 0;
const DOM_Observer = new MutationObserver(saveAndTransformLeftText);
const DOM_Observer2 = new MutationObserver(saveAndTransformRightText);
const DOM_Observer3 = new MutationObserver(saveAndTransformMidText);

const DOM_ObserverConfig = { childList: true, subtree: true };


//This function will check the Divs in the documment to make it format better structured:
//upperDiv
//*upperUpperDiv
//*lowerUpperDiv
//midDiv
//*upperMidDiv
//*lowerMidDiv
//lowerDiv

function midDivChecker() {

  for (let i =0; i<allMidDivs.length; i++){

    if ( (allMidDivs[i].firstChild).tagName === "DIV"){
      const upperUpperDiv = document.createElement("div")
      const lowerUpperDiv = document.createElement("div")

      allUpperDiv[i].appendChild(upperUpperDiv)
      allUpperDiv[i].appendChild(lowerUpperDiv)
      lowerUpperDiv.appendChild(allMidTextarea[i])
      
      upperUpperDiv.setAttribute("class","upperUpperDiv")
      lowerUpperDiv.setAttribute("class","lowerUpperDiv")

      const upperMidDiv = document.createElement("div")
      // const upperLeftMidDiv = document.createElement("div")
      // const upperRightMidDiv = document.createElement("div")
      const lowerMidDiv = document.createElement("div")
      const lowerLeftMidDiv = document.createElement("div")
      const lowerRightMidDiv = document.createElement("div")

      allMidDivs[i].appendChild(upperMidDiv)
      // upperMidDiv.appendChild(upperLeftMidDiv)
      // upperMidDiv.appendChild(upperRightMidDiv)
      allMidDivs[i].appendChild(lowerMidDiv)
      lowerMidDiv.appendChild(lowerLeftMidDiv)
      lowerMidDiv.appendChild(lowerRightMidDiv)

      upperMidDiv.setAttribute("class","upperMidDiv")
      // upperLeftMidDiv.setAttribute("class","upperLeftMidDiv toolbar")
      // upperRightMidDiv.setAttribute("class","upperRightMidDiv toolbar")
      lowerMidDiv.setAttribute("class","lowerMidDiv")
      lowerLeftMidDiv.setAttribute("class","lowerLeftMidDiv")
      lowerRightMidDiv.setAttribute("class","lowerRightMidDiv")
      
      lowerLeftMidDiv.appendChild(allMidDivs[i].children[0])
      lowerRightMidDiv.appendChild(allMidDivs[i].children[0])


    }
  }  
}

//Changes the Div styles.
// function toolbarStyleAdder(){
//   const allUpperUpperDiv = document.getElementsByClassName("upperUpperDiv")
//   const allUpperLeftMidDiv = document.getElementsByClassName("upperLeftMidDiv")
//   const allUpperRightMidDiv = document.getElementsByClassName("upperRightMidDiv")

//   for (let i=1; i<allUpperUpperDiv.length; i++){
//     allUpperUpperDiv[i].style.border = "solid"
//     allUpperUpperDiv[i].style.height = "50px"
//   }
  
//   for (let i=0; i<allUpperLeftMidDiv.length; i++){
//     allUpperLeftMidDiv[i].style.border = "solid"
//     allUpperLeftMidDiv[i].style.width = "45vw"
//     allUpperLeftMidDiv[i].style.height = "50px"
//   }
//   for (let i=0; i<allUpperRightMidDiv.length; i++){
//     allUpperRightMidDiv[i].style.border = "solid"
//     allUpperRightMidDiv[i].style.width = "45vw"
//     allUpperRightMidDiv[i].style.height = "50px"
//   }
// }

//Add the import/export button.
function backupAdder(){
  const allDivsWhoNeedToolbar = document.getElementsByClassName("upperUpperDiv")
  let classHolder = ""

    classHolder = allDivsWhoNeedToolbar[0].className
    const testButton = document.createElement("input")
    const testButton1 = document.createElement("input")

    classHolder = classHolder.replace(" toolbar","")
    testButton.setAttribute("type","button")
    testButton1.setAttribute("type","file")

    testButton.setAttribute("class","toolbarbuttons")
    testButton1.setAttribute("class","toolbarbuttons")
    testButton.setAttribute("id","toolbarbutton00")
    testButton1.setAttribute("id","loadFile")
    testButton1.setAttribute("hidden","true")

    const label = document.createElement("label")
    

    label.setAttribute("for","loadFile")
    label.innerHTML ="Load columns from a .csv"
    label.setAttribute("id","loadButton")
    testButton.setAttribute("value","Save columns in a .csv")
    testButton1.setAttribute("placeholder","Load")
    testButton1.setAttribute("accept",".csv")
   

    allDivsWhoNeedToolbar[0].appendChild(testButton)
    allDivsWhoNeedToolbar[0].appendChild(label)
    allDivsWhoNeedToolbar[0].appendChild(testButton1)

    allDivsWhoNeedToolbar[0].setAttribute("class",`${classHolder}`)

    testButton.addEventListener("click",save,false )
    testButton1.addEventListener("change",load,false )
}

//This function takes the imported file text (content) and leave it in the textareas and in 
// the columnTextRaw.

function updateTextColumn(content){

  let allRows = content.split(/\r?\n|\r/)
  let k = 0;
  let i = 0;
  var textEnd = 0
  var titlePosition = 0
  while (allRows[i]!="TextEnd" && allRows[i]!="TextEnd,"){
    i = i+1;
    

    textEnd= textEnd+1;
    if(allRows[i]==="TextEnd" || allRows[i]==="TextEnd,"){
      var textEndDetected = true;
    }
    if(allRows[i]===undefined && 
    allRows[i+1]===undefined &&
    allRows[i+2]===undefined &&
    allRows[i+3]===undefined &&
    allRows[i+4]===undefined &&
    allRows[i+5]===undefined){
      alert(`No TextEnd at the end of the .csv or there are too many empty columns, the end will be after ${allRows[i]}`)
      break
    }
  }

  if(textEndDetected===true){
    titlePosition = textEnd+1 
    textEnd=textEnd-2
  }else{
    titlePosition = null
  }
  
  //Update the website columns to the content columns (when there are more columns in content).
  while(textEnd/2>set){
    addSegmentButton.click()
  }

  //Update the website columns to the content columns (when there are less columns in content).
  while(textEnd/2!=set){
    deleteSegmentButton.click()
  }

  let firstTwoColumns = ""

  let j = 0;
  let l = 0;
  let m = 0;
  //This loop is complex. It takes each row of content and divide it using ",".
  //By using the DIVtextarea.lenght and some break values, stops when all the required textareas.
  //and columnTextRaw needed are filled.
  //k= row.
  //j= column (0 or 1).
  //i= for specify each DIVtextarea.
  //l= for specify each columnTextRaw.
  //m= with the length, is used to check if there is the last DIVtextarea.

  for (let i=0;i < (allLeftRightColumnsTextarea.length + allMidTextarea.length)-2;++i){

    firstTwoColumns= allRows[k].split(",")

    allLeftColumnsTextarea[i].firstChild.innerHTML = firstTwoColumns[j]

    columnTextRaw[l] = firstTwoColumns[j]

    k = k+1;
    j = j+1;
    l= l+2;
    m = m+1;
    if (m > (allLeftRightColumnsTextarea.length + allMidTextarea.length)-2) {
      break
    }

    allRightColumnsTextarea[i].firstChild.innerHTML = firstTwoColumns[j]
    columnTextRaw[l] = firstTwoColumns[j]

    j = j+1;
    l= l+2;

    j = 0
    m = m+1;

    if (m > (allLeftRightColumnsTextarea.length + allMidTextarea.length)-2) {

      break
    }
 
    firstTwoColumns= allRows[k].split(",")

    if (m > (allLeftRightColumnsTextarea.length + allMidTextarea.length)-2) {
      break
    }

    allMidTextarea[i+1].firstChild.innerHTML = firstTwoColumns[j]
    columnTextRaw[l] = firstTwoColumns[j]

    k = k+1;
    l= l+2;
    m = m+1;
  }

  //default title name (if there is not "Title=" in content).
  if(titlePosition===null){
    importedTitle = "Backup"
  }else{
  //title name.
    importedTitle = (allRows[titlePosition]).replace("Title=", "")
  }

  //default title name (if content only contains "Title=").
  if(importedTitle != ""){
    title[0].value = importedTitle
  }else{
    title[0].value = "Backup"
  }

  //Updates columnText to make the same with the output DIVtextarea if it needed.
  //To make this, scans all the columnTextRaw to check if have text.
  //i= value.
  //k= limiter (for 2 columns).

  for (let i=0;i < ((allLeftRightColumnsTextarea.length + allMidTextarea.length)-1)*2;++i){

    for(let k=0;k < 2;++k){//

      if(columnTextRaw[i] === "null" || columnTextRaw[i] === undefined){
        i=i+2
  
      }else{
        columnText[i] = `<div class="pull-right">${columnTextRaw[i]}</div>`
        i=i+2;
      }

    }


    if(columnTextRaw[i] === "null" || columnTextRaw[i] === undefined){
      i=i+2

    }else{
      columnText[i] = `${columnTextRaw[i]}`
      i=i+2;
    }
    i=i-1
  }

//updates all.
  outputText.value = columnText.join(`
`)
saveAndTransformLeftText()
saveAndTransformMidText()
saveAndTransformRightText()
saveTitle()
}

//Read the imported file.
function load(file){
  const backupFile = file.target.files[0];

  if(!backupFile){
    return;
  }

  const reader = new FileReader();
  reader.onload = function(file){
   const content = file.target.result
   updateTextColumn(content)
   
  }

  reader.readAsText(backupFile)

}
//Import the current work in the app.
function save() {

  let k = 0;
  let counter = 0;
  var columnTextRawToExport = [];

  for (let i = 0 ;i <((allLeftRightColumnsTextarea.length + allMidTextarea.length)*2)-2;i+2){

    columnTextRawToExport.push([columnTextRaw[i]])//Left column/mid column.

    if(counter % 2 === 0){
    //counter with pair value: left column and right column are added to ColumnTextRawToExport.
    //counter with odd value: mid column is added to columnTextRawToExport.

      //[$EPARAT0R] will be used to... separate each string (pair scenario).
      columnTextRawToExport[k].push(columnTextRaw[i+2]+ "[$EPARAT0R]")//Right column + separator.
      i=i+4
    }else{

      //adds only the separator (odd scenario).
      columnTextRawToExport[k] = columnTextRawToExport[k] + "[$EPARAT0R]"
      i=i+2
    }

    k=k+1;
    
    counter = counter+1;
  }


  columnTextRawToExport= columnTextRawToExport.toString()  //Converts all in one string

  k=0;

//This part of the codes use all the info to make a .csv file.

  columnTextRawToExport= columnTextRawToExport.replaceAll("[$EPARAT0R],",'\n')
  columnTextRawToExport= columnTextRawToExport.replaceAll("[$EPARAT0R]","")

  columnTextRawToExport= columnTextRawToExport + `${"\n\n" + "TextEnd" }`
  
  if(title[0].value != ""){
    columnTextRawToExport= columnTextRawToExport + `${"\n" + "Title=" + title[0].value}`

  }
  
  const a = document.createElement("a")

  const blob1 = new Blob([columnTextRawToExport],{type: "octet/stream"})

  url = window.URL.createObjectURL(blob1)//Creates a objecturl to click on it and download
  // the file automatically.

  a.href = url
  const date = new Date()

  if(title[0].value != ""){

    a.download = `${String(title[0].value) + "-" + (date.getDate())+ "-" + (date.getMonth()+1) + "-" + (date.getFullYear())}.csv`

  }else{
    a.download = `${"backup-" + (date.getDate())+ "-" + (date.getMonth()+1) + "-" + (date.getFullYear())}.csv`

  }
  a.click()
  window.URL.revokeObjectURL(url)
}

function addQuill(){

  if(fixedColumn != ""){
    const quill = new Quill(`#column${fixedColumn}`, {

      modules: {
        toolbar: toolbarOptions,
      },
      theme:"snow"
    })
  }


}

function qlEditorMod(){

  let i =0;

  let divsLength= (allLeftColumnsTextarea.length-1)

  while (i<=divsLength) {

    if((allLeftColumnsTextarea[i].firstChild) === null){

      let idHolder = allLeftColumnsTextarea[i].id
      fixedColumn = idHolder.replace("column","")

  
        addQuill(fixedColumn)


        allLeftColumnsTextarea[i].firstChild.setAttribute("id",`column${fixedColumn}`)
      DOM_Observer.observe(allLeftColumnsTextarea[i], DOM_ObserverConfig)
      i=i+1;

    }else{
      i=i+1;
    }
  }

  i =0;

  divsLength= (allRightColumnsTextarea.length-1)

  while (i<=divsLength) {

    if((allRightColumnsTextarea[i].firstChild) === null){

      let idHolder = allRightColumnsTextarea[i].id
      fixedColumn = idHolder.replace("column","")

  
        addQuill(fixedColumn)


        allRightColumnsTextarea[i].firstChild.setAttribute("id",`column${fixedColumn}`)
      DOM_Observer2.observe(allRightColumnsTextarea[i], DOM_ObserverConfig)
      i=i+1;

    }else{
      i=i+1;
    }
  }

  i=1;
  divsLength= (allMidTextarea.length-1)


  while (i<=divsLength) {

    if((allMidTextarea[i].firstChild) === null){

      idHolder = allMidTextarea[i].id
      fixedColumn = idHolder.replace("column","")


        addQuill(fixedColumn)
      
      allMidTextarea[i].firstChild.setAttribute("id",`column${fixedColumn}`)
      DOM_Observer3.observe(allMidTextarea[i], DOM_ObserverConfig)


      i=i+1;
    }else{
      i=i+1;
    }
  }
}
//IF there is text from a past session in localStorage this will add it to the
//editors DIVtextarea for any column.

function fromBackupToTextarea(){
let i = 0;
let k = 0;

  while (i<=allLeftRightColumnsTextarea.length-1){

    if(allLeftRightColumnsTextarea[i].firstChild.innerHTML != columnTextRaw[k]){
      allLeftRightColumnsTextarea[i].firstChild.innerHTML = columnTextRaw[k]
    }
    i=i+1;
    k=k+2;
    if(allLeftRightColumnsTextarea[i].firstChild.innerHTML != columnTextRaw[k]){
      allLeftRightColumnsTextarea[i].firstChild.innerHTML = columnTextRaw[k]
    }
    i=i+1;
    k=k+4;
  }
  k=4
  i=1
  while (i<=allMidTextarea.length-1){

    if(allMidTextarea[i].firstChild.innerHTML != columnTextRaw[k]){
      allMidTextarea[i].firstChild.innerHTML = columnTextRaw[k]
    }
    i=i+1;
    k=k+6;
  }


}

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote'],

  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript

  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
  ['clean']                                         // remove formatting button
];


midDivChecker()
backupAdder()
qlEditorMod()
fromBackupToTextarea()

addSegmentButton.addEventListener("click",qlEditorMod,false)
