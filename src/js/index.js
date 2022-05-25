document.addEventListener('DOMContentLoaded', () => {
    
    class SongFx{
        constructor(){
            this.click = new Audio('./src/songs/click.wav')
            this.lose = new Audio('./src/songs/losing.wav')
            this.start = new Audio('./src/songs/start_game.wav')
            this.win = new Audio('./src/songs/winning.wav')
        }
    }

    class ImageNode{
        constructor(imgName, nodeToAppend){
            this.imgDogPath = './src/img/dog.png'
            this.imgStarPath = './src/img/gold-star.png'
            this.imgName = imgName
            this.nodeToAppend = nodeToAppend
            this.buildNode()
            this.append()
            this.show()
        }

        buildNode(){
            this.imgNode = document.createElement('img')
            if(this.imgName === "dog"){
                this.imgNode.src = this.imgDogPath
            }
            if(this.imgName === "star"){
                this.imgNode.src = this.imgStarPath
            }
            this.imgNode.classList.add('imgInFace')
        }

        append(){
            this.nodeToAppend.appendChild(this.imgNode)
        }

        show(){
            setTimeout((e) => {
                this.imgNode.classList.add('show')
            },100)
        }   
    }

    class Game{
        constructor(board, form_plyr_settings){
            this.board = board
            this.grid = [[],[],[]]
            this.form_plyr_settings = form_plyr_settings
            this.init()
        }

        init(){
            this.get_faces()
            this.add_faces_clck_listener()
            this.set_player_settings()
            this.set_game_turn()
            this.audioFxs = new SongFx()
            this.audioFxs.start.play()
        }

        set_circle_on_face(){
        }

        set_x_on_face(){
            
        }

        set_game_turn(){
            let rand = Math.floor(Math.random() * 2);
            this.game_turn = rand == 1 ? 'player' : 'machine' 
        }


        get_faces(){
            this.faces = this.board.querySelectorAll('div')
        }

        set_player_settings(){
            this.player_nickname = this.form_plyr_settings.querySelector('input[name="nickname"]').value
            this.player_character = null
            const characters = this.form_plyr_settings.querySelectorAll('input[type="radio"]')
            // find character checked
            characters.forEach(node => {
                if(node.checked){
                    this.player_character = node.value
                }
            })
        }

        fill_face(event){
            this.audioFxs.click.play()
            new ImageNode('star', event.target)
        }

        add_faces_clck_listener(){
            this.faces.forEach(node => {
                node.addEventListener('click', e => this.fill_face(e)) 
            });
        }
    }

    const board = document.querySelector('.board')   
    const form_plyr_settings = document.getElementById('playerSettingsForm')
    const btnCloseModal = document.getElementById('btnCloseModal')
    

    form_plyr_settings.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('new game created!')        
        const game = new Game(board, form_plyr_settings)
        btnCloseModal.click()
    })
})
