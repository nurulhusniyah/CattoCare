class Chatbox {


//const obj = JSON.parse("tag": "skin");



    constructor() {
        this.args = {
            openChatbox: document.querySelector('.chatbox'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            testButton: document.querySelector('.test__button')

        }

       this.state = false;
       this.messages = [];
    }

    display() {


        const {openChatbox, chatBox, sendButton} = this.args; //openButton,

        openChatbox.addEventListener('click', () => this.toggleState(chatBox)) //'click', () => this.toggleState(chatBox)

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))


        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {

                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

       // if(this.state) {
            chatbox.classList.add('chatbox--active')
//}
        return this.state;
        //else {
            //chatbox.classList.remove('chatbox--active')
        //}
    }






    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value

        if (text1 === "") {
            return;
        }
        let msg1 = { name: "User", message: text1 }
        this.messages.push(msg1);

        fetch('http://127.0.0.1:8000/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
          })
          .then(r => r.json())
          .then(r => {
            let msg2 = { name: "Catto", message: r.answer };

            this.messages.push(msg2);
            this.updateChatText(chatbox)
            textField.value = ''

        }) .catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
          });
    }


    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, index) {
            if (item.name === "Catto")
            {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else
            {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'

            }
          });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }




}

//Image Classification

const URL = "https://teachablemachine.withgoogle.com/models/Cgm5MC6Tx/";

    let model, labelContainer, maxPredictions;

			// Load the image model
			async function init() {
				const modelURL = URL + 'model.json';
				const metadataURL = URL + 'metadata.json';

				// load the model and metadata
				model = await tmImage.load(modelURL, metadataURL);
				maxPredictions = model.getTotalClasses();

				labelContainer = document.getElementById('label-container');
				for (let i = 0; i < maxPredictions; i++) {
					// and class labels
					labelContainer.appendChild(document.createElement('div'));
					}
				}

						async function predict() {
				// predict can take in an image, video or canvas html element
				var image = document.getElementById('imagePreview');
				const prediction = await model.predict(image, false);
				for (let i = 0; i < maxPredictions; i++) {
				prediction.sort((a, b) => b.probability - a.probability);
				if (prediction[0].probability < 0.7) {

                    labelContainer.childNodes[0].innerHTML = '<span class="error-text">Sorry we are unable to detect..</span>';
                        }else{
                const classPrediction =
                                'It looks like an issue called as ' + prediction[0].className + '. You can upload again!<br>Note: The image detection is not 100% accurate. You can reach for nearest veterinarian clinic around you using our services for experts consultation.' ;
                            labelContainer.childNodes[0].innerHTML = classPrediction;

                      }

				}
			}

	/*		async function predict() {
				// predict can take in an image, video or canvas html element
				var image = document.getElementById('imagePreview');
				const prediction = await model.predict(image, false);
				for (let i = 0; i < maxPredictions; i++) {
				prediction.sort((a, b) => b.probability - a.probability);
					const classPrediction =
						prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
					labelContainer.childNodes[i].innerHTML = classPrediction;
				}
			}*/


//var messageRedness = document.getElementById ('chatbot__footer');
const chatbox = new Chatbox();
chatbox.display();