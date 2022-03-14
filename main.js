function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  back_camera = {video:{
    facingMode:{
      exact:"environment"
    }}};
  video = createCapture(back_camera);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', model_loaded);
}

function model_loaded(){
  console.log('Model Loaded!');
}

function draw(){
  image(video, 0, 0, 300, 300);
  classifier.classify(video, got_result);
}

var previous_result = ' ';

function got_result(error, results){
  if(error){
    console.error(error);
  }else{
    if((results[0].confidence > 0.5) && (previous_result != results[0].label)){
      console.log(results);
      previous_result = results[0].label;

      synth = window.speechSynthesis;
      speak_data = 'Object Identified As ' + results[0].label;
      utter_this = new SpeechSynthesisUtterance(speak_data);
      synth.speak(utter_this);

      document.getElementById('object').innerHTML = ' ' + results[0].label;
      document.getElementById('accuracy').innerHTML = ' ' + results[0].confidence.toFixed(4) * 100 + '%';
    }
  }
}