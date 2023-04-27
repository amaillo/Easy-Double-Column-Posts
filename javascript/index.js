//Main javascript file By amaillo.

const addSegmentButton = document.querySelector("#addSegment")//Select "Add new segment" button.
const deleteSegmentButton = document.querySelector("#deleteSegment")//Select "Delete added Segment" button.
const container = document.querySelector(".container")//Select the Div where the left/right
//columns and the midtext are.
const outputText = document.querySelector(".outputColumn")//Select the last DIVtextarea.
const title = document.getElementsByClassName("title")
let addSegmentCounter =4;//Controls the position of each text in textColum, where all the text is.
let addSegmentVisibleCounter =2; //A visual counter for each pair of columns.
let set = 0 //Controls the number of text area displaed, 0 = 2, 1 = 5, 2 =8....
let firstLeftColumn = document.querySelector("#column0")//Select the first left column.
let firstRightColumn = document.querySelector("#column2")//Select the first right column.
const allMidTextarea = document.getElementsByClassName("midInputColumn") 
const allLeftRightColumnsTextarea = document.getElementsByClassName("inputColumn")

const copyToClipboard = document.querySelector("#copyToClipboard")

const resizeObserver = new ResizeObserver(entries =>{ //Observe size changes in first left-right columns.
	firstRightColumn.style.height = firstLeftColumn.offsetHeight + "px"
	firstLeftColumn.style.height = firstRightColumn.offsetHeight + "px"
})

resizeObserver.observe(firstLeftColumn)
resizeObserver.observe(firstRightColumn)//

function saveAtLocalStorage(){//Save the most important text strings, and set in local storage
                                   //Converts the strings in JSON format.
	localStorage.setItem(`columnText`,JSON.stringify(columnText))//
	localStorage.setItem(`columnTextRaw`,JSON.stringify(columnTextRaw))
	localStorage.setItem(`set`,set)
	localStorage.setItem(`titleText`,JSON.stringify(titleText))
	localStorage.pass="1"// 0 = new user
}

//Removes the last 3 elements added, their text, and return all counters 
	//to a previous state.
function removeSegment(){
	let idHolder =""    
		
	lastTextareaNumber= [allLeftRightColumnsTextarea.length -2]
	idHolder = allLeftRightColumnsTextarea[lastTextareaNumber].id
	idHolder = idHolder.replace("column","")
	columnTextRaw[idHolder]= undefined
	columnText[idHolder]= undefined

	lastTextareaNumber = [allLeftRightColumnsTextarea.length -1]
	idHolder = allLeftRightColumnsTextarea[lastTextareaNumber].id
	idHolder = idHolder.replace("column","")
	columnTextRaw[idHolder]= undefined
	columnText[idHolder]= undefined
		
	lastTextareaNumber = [allMidTextarea.length-1]
	idHolder = allMidTextarea[lastTextareaNumber].id
	idHolder = idHolder.replace("column","")
	columnTextRaw[idHolder]= undefined
	columnText[idHolder]= undefined

	const lastUpperDiv = document.querySelectorAll(".upperDiv")

	const lastMidDiv = document.querySelectorAll(".midDiv")

	const lastLowerDiv = document.querySelectorAll(".lowerDiv")
	lastUpperDiv[set].remove();
	lastMidDiv[set].remove();
	lastLowerDiv[set].remove();
  	addSegmentCounter = addSegmentCounter -6;
  	addSegmentVisibleCounter = addSegmentVisibleCounter -1;

	set = set-1;

	if(addSegmentCounter==4) {//hides the deleteSegmentButton.
		deleteSegmentButton.setAttribute("type","hidden")
	}
	saveAtLocalStorage()
	outputText.value= columnText.join(`
`)
}

//Save the text in columText/columTextRaw and in localStorage to be showed in the textareas
function saveAndTransformLeftText(){

	let idHolder = ""
	const lastLeftColumn = document.querySelectorAll(".leftInputColumn")
	let columnHolder = lastLeftColumn[set]
	idHolder = columnHolder.id
	idHolder= (idHolder).replace("column","")

	if(document.activeElement.id === "addSegment" && columnTextRaw[idHolder] != undefined ){
//If for a casualty, when the Add button is pressed there are text in the new left colunm
//it will be added to the output text too!
			columnText[idHolder] = `<div class="pull-left">${columnTextRaw[idHolder]}</div>`
			outputText.value= columnText.join(`
`)

	}else{ //


		idHolder = document.activeElement.id
		idHolder= idHolder.replace("column","")
		columnTextRaw[idHolder] = ((document.activeElement)).innerHTML
		columnText[idHolder] = ((document.activeElement)).innerHTML

		columnText[idHolder] = `<div class="pull-left">${columnText[idHolder]}</div>`
		outputText.value= columnText.join(`
`)
	}

saveAtLocalStorage()
}

function saveAndTransformRightText(){
	let idHolder = ""
	const lastRightColumn = document.querySelectorAll(".rightInputColumn")
	let columnHolder = lastRightColumn[set]
	idHolder = columnHolder.id
	idHolder= (idHolder).replace("column","")

	if(document.activeElement.id === "addSegment" && columnTextRaw[idHolder] != undefined ){
//If for a casualty, when the Add button is pressed there are text in the new right colunm
//it will be added to the output text too!
			columnText[idHolder] = `<div class="pull-right">${columnTextRaw[idHolder]}</div>`
			outputText.value= columnText.join(`
`)

	}else{ //
		idHolder = document.activeElement.id

		idHolder= idHolder.replace("column","")
		columnTextRaw[idHolder] = ((document.activeElement)).innerHTML
		columnText[idHolder] = ((document.activeElement)).innerHTML
		columnText[idHolder] = `<div class="pull-right">${columnText[idHolder]}</div>`
		 outputText.value= columnText.join(`
`)
	}

saveAtLocalStorage()
}

function saveAndTransformMidText(){
	let idHolder = ""
	const lastMidColumn = document.querySelectorAll(".midInputColumn")

	if(lastMidColumn[set].tagName === "pre"){
		set = set+1;
	}
	let columnHolder = lastMidColumn[set]
	
	idHolder = columnHolder.id
	
	idHolder= (idHolder).replace("column","")

	if ( columnTextRaw[idHolder] != undefined && document.activeElement.id === "addSegment"){//removes "midTextButton" part
		//The text that is in the DIVtextarea is replaced with the one saved in columnTextRaw
	
		lastMidColumn[set].value = columnTextRaw[idHolder]

		
	}else{ //
		idHolder = document.activeElement.id

		idHolder= idHolder.replace("column","")
		columnTextRaw[idHolder] = ((document.activeElement)).innerHTML
		columnText[idHolder] = ((document.activeElement)).innerHTML
		columnText[idHolder] = `<center>${columnText[idHolder]}</center>`
		 outputText.value= columnText.join(`
`)
	}

saveAtLocalStorage()
}

function saveTitle(){

titleText = title[0].value

saveAtLocalStorage()
}

//Add segments when the button with the same name is pressed.
function addSegment(){

	//Create all the neccesary elements and asociate it them with a constant
	const upperDiv = document.createElement("div");
	const midDiv = document.createElement("div");
	const lowerDiv = document.createElement("div");

	const newLeftColumn = document.createElement("div");
	const newRightColumn = document.createElement("div");
	const midText = document.createElement("div");

	//All the elements are positioned with their parents
	container.appendChild(upperDiv)
	container.appendChild(midDiv)
	container.appendChild(lowerDiv)
	upperDiv.appendChild(midText)
	midDiv.appendChild(newLeftColumn)
	midDiv.appendChild(newRightColumn)

	//All the elements get their attributes

	upperDiv.setAttribute("class","upperDiv")
	midDiv.setAttribute("class","midDiv")
	lowerDiv.setAttribute("class","lowerDiv")
	newLeftColumn.setAttribute("type","text")
	newRightColumn.setAttribute("type","text")
	midText.setAttribute("type","text")
	
	newLeftColumn.setAttribute("onkeyup","saveAndTransformLeftText()")
	newRightColumn.setAttribute("onkeyup","saveAndTransformRightText()")
	midText.setAttribute("onkeyup","saveAndTransformMidText()")


	
	//These counters are important to maintain a unique id for any DIVtextarea which is important
	//to select them correctly.
	midText.setAttribute("id",`column${addSegmentCounter}`)
	addSegmentCounter = addSegmentCounter+2;
	newLeftColumn.setAttribute("id",`column${addSegmentCounter}`)
	addSegmentCounter = addSegmentCounter+2;
	newRightColumn.setAttribute("id",`column${addSegmentCounter}`)
	addSegmentCounter = addSegmentCounter+2;
	midText.setAttribute("class","midInputColumn midInputButton")
	
	
	newLeftColumn.setAttribute("placeholder",`Left column ${addSegmentVisibleCounter}`)
	newRightColumn.setAttribute("placeholder",`Right column ${addSegmentVisibleCounter}`)
	addSegmentVisibleCounter = addSegmentVisibleCounter+1;

	newLeftColumn.setAttribute("class","leftInputColumn inputColumn")
	newRightColumn.setAttribute("class","rightInputColumn inputColumn")

	if(addSegmentCounter>4) {//Checks if the delete button must appear or not.
		deleteSegmentButton.setAttribute("type","button")
	}

	deleteSegmentButton.onclick = function(){ //Add it function if is clicked
		removeSegment()
	}

//Add the localStorage saved text to the new textareas columns
//and also updates the output DIVtextarea if there is a text from a previous session.
// 1 = there has been a previous session.
	if ( localStorage.pass === "1" ) {

		let idHolder = newLeftColumn.id

		if ( columnTextRaw[idHolder.replace("column","")] != undefined ){
			newLeftColumn.value = columnTextRaw[idHolder.replace("column","")]
		}

		idHolder = newRightColumn.id
		if ( columnTextRaw[idHolder.replace("column","")] != undefined ){
			newRightColumn.value = columnTextRaw[idHolder.replace("column","")]
		}

	}

	const resizeObserver = new ResizeObserver(entries =>{ //Observe size changes in left-right columns.
		newRightColumn.style.height = newLeftColumn.offsetHeight + "px"
		newLeftColumn.style.height = newRightColumn.offsetHeight + "px"
	})
	
	resizeObserver.observe(newLeftColumn)
	resizeObserver.observe(newRightColumn)//

	set=set+1

	if (document.readyState==="complete"){
		midDivChecker()
		// toolbarStyleAdder()
	}
}

addSegmentButton.addEventListener("click",addSegment,false)
resizeObserver.observe(document.activeElement)// :u


//If pass === "undefined" then is a new session.
if( typeof localStorage.pass === "undefined"){
	var columnText = []
	var columnTextRaw = []
	var titleText = ""
}else{//If is not a new session, this brings the text of localstorage back
	//backupSet: is used to save a past set value.
	var backupSet = Number(localStorage.getItem("set"))
	//columnText: can save the output text.
	var columnText = JSON.parse(localStorage.getItem(`columnText`))
	//columnTextRaw: saves only input text.
	var columnTextRaw = JSON.parse(localStorage.getItem(`columnTextRaw`))

	outputText.value = columnText.join(`
`)

if(localStorage.getItem(`titleText`) != "undefined"){
var backupTitle = JSON.parse(localStorage.getItem(`titleText`))
title[0].value = backupTitle
}
  


//By using a old set value, the add new segment button is autoclicked to get back
//the current state of the number of text areas in screen.
	while (backupSet > 0){
		addSegmentButton.focus()
		addSegmentButton.click()
		backupSet = backupSet-1
	}


	saveTitle()
}

copyToClipboard.addEventListener("click",function(){

	let text = outputText.value
	
	const copyContent = async () => {
	  try {
		await navigator.clipboard.writeText(text);
		console.log('Content copied to clipboard');
	  } catch (err) {
		console.error('Failed to copy: ', err);
	  }
	}
	copyContent()
})