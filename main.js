function setup() {
  canvas = createCanvas(300,300);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();  //hide the extra component

  classifier = ml5.imageClassifier('MobileNet',modelLoaded);
}

function modelLoaded(){
  console.log("Model Loaded !"); 
} //modelLoaded function is needed to start the image classification

function draw(){
  image(video, 0, 0, 300, 300); //placing the webcam in the canvas

  classifier.classify(video,gotResult); //code for comparing the video with the model
}

function gotResult(error,results){
  if(error){
    console.error(error); //in case of any error, display it on the console screen
  }
  else{
    console.log(results); //display the results on the console screen (will be displayed as an array)

    document.getElementById("result_object_name").innerHTML = results[0].label; //display the name of the object

    accuracy = results[0].confidence.toFixed(3); //store the confidence level in a variable
    percentage = accuracy*100; //get the accuracy as percentage

    document.getElementById("result_object_accuracy").innerHTML = percentage + "  %";
  }
}