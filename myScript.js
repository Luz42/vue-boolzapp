console.log('JS-OK');

const app = new Vue(
    {
        el: '#root',
        data: {

            searchContactInput: '',
            resultContactSearch: '',
            activeIndex: 0,
            newMessage:'',

            contacts: [
                {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                    },
                    {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                    },
                    {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                    }
                ],
                },
                {
                name: 'Samuele',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                    },
                    {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                    },
                    {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Alessandro B.',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Alessandro L.',
                avatar: '_5',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Claudia',
                avatar: '_6',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                    },
                    {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
                    }
                ],
                },
                {
                name: 'Federico',
                avatar: '_7',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Davide',
                avatar: '_8',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                    }
                ],
                }
                ],

        },
        methods: {
            
            setActiveElement(index){

                this.activeIndex = index

            },

            getMessageHour(date){
                
                const fullDate = date.split(" ")
                let onlyHour = fullDate[1].slice(0, -3)
                return onlyHour
            },

            sendMessage(contactMessages){
                //nei messaggi del contatto con indexActive viene pushato il nuovo oggetto (messaggio)
                
                if(this.newMessage !== ''){
                    contactMessages.push(
                        {
                        date: this.getNowDate(),
                        message: this.newMessage,
                        status: 'sent'
                        },
                    );
                        
                    this.newMessage = '';
                    //viene creato un messaggio di risposta all'esterno della funzione setTimeOut
                    //in modo che possa ricevere il valore della funzione getNowDate
                    // ***** CONVIENE INSERIRLO IN DATA? *****
                    const replyMessage = {
                        date: this.getNowDate(),
                        message: 'Ok!',
                        status: 'received'
                    };

                    setTimeout(function(){contactMessages.push(replyMessage)}, 1000)
                }   
            },

            getNowDate(){

                const date = new Date();

                const hours = date.getHours()
                const minutes = this.getZeroBeforeSingleNumber(date.getMinutes())
                const seconds =  this.getZeroBeforeSingleNumber(date.getSeconds())
                const day = this.getZeroBeforeSingleNumber(date.getDate())
                const month = this.getZeroBeforeSingleNumber(date.getMonth() + 1)
                const year = date.getFullYear()
                
                return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`

            },

            getZeroBeforeSingleNumber(number){

                let fixNumber = number < 10 ? '0' + number : number
                
                return fixNumber
            },

            findContact(){
                //si da una classe che nasconda tutti i contatti (v-show?)
                //si effettua la ricerca
                //this.resultContactSearch= this.contacts.filter(singleContact => singleContact.name.toLowerCase().includes(this.searchContactInput.toLowerCase()));
                
                this.contacts.forEach((contact, index)=> {
                    //console.log(this.searchContactInput)
                    if(this.searchContactInput === ''){
                        contact.visible = true
                    }
                    else if (this.searchContactInput && contact.name.toLowerCase().includes(this.searchContactInput.toLowerCase())){
                        //console.log(contact.name)
                        contact.visible = true
                        //console.log('il visible di', contact.name,'alla posizione ',index, 'diventa =',contact.visible)
                    }
                    else
                        contact.visible = false
                    });
        
                    //console.log(this.contacts)
                
                //si assegna la classe visibile a questi elementi        
            },

            // getLastMessage(messages){
            //     let i = 0
            //     i++
            //     console.log('il contatto',i,'ha', messages.length, 'messaggi')
            //     console.log(messages[messages.length-1].message)
            //     return messages[messages.length-1].message

            // }

        },

    }
)