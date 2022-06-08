document.addEventListener('DOMContentLoaded', () => {
    const DOGIMGPATH = './src/img/dog.png'
    const STARIMGPATH = './src/img/gold-star.png'
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
        constructor(board, formPlyrSettings, playerNodeImg, playerNodeName){
            this.board = board
            this.grid = [[],[],[]]
            this.formPlyrSettings = formPlyrSettings
            this.playerNodeImg = playerNodeImg
            this.playerNodeName = playerNodeName

            console.log(this)
            this.init()
        }

        init(){
            this.getFaces()
            this.addFacesClckListener()
            this.setPlayerSettings()
            this.setGameTurn()
            this.audioFxs = new SongFx()
            this.audioFxs.start.play()
        }

        setCircleOnFace(){
        }

        setXonFace(){
            
        }

        setGameTurn(){
            let rand = Math.floor(Math.random() * 2);
            this.game_turn = rand == 1 ? 'player' : 'machine' 
        }


        getFaces(){
            this.faces = this.board.querySelectorAll('div')
        }

        setPlayerSettings(){
            this.playerNickname = this.formPlyrSettings.querySelector('input[name="nickname"]').value
            this.playerCharacter = null
            const characters = this.formPlyrSettings.querySelectorAll('input[type="radio"]')
            // find character checked
            characters.forEach(node => {
                if(node.checked){
                    this.playerCharacter = node.value
                }
            })

            this.renderPlayerSettings()
        }

        renderPlayerSettings(){
            let imgSrc = this.playerCharacter == 'dog' ? DOGIMGPATH : STARIMGPATH
            this.playerNodeImg.setAttribute('src', imgSrc)
            this.playerNodeName.innerText = this.playerNickname 
        }

        fillBoardFace(event){
            if(event.target.children.length == 0){
                new ImageNode('star', event.target)
                event.target.classList.add('locked')
                this.audioFxs.click.play()
            }
        }

        addFacesClckListener(){
            this.faces.forEach(node => {
                node.addEventListener('click', e => this.fillBoardFace(e)) 
            });
        }
    }

   
    // html nodes 
    const board = document.querySelector('.board')   
    const btnCloseModal = document.getElementById('btnCloseModal')
    const mainModal = document.getElementById('mainModal')
    const formPlyrSettings = document.getElementById('playerSettingsForm')
    const playerNodeImg = document.querySelector('.player-char')
    const playerNodeName = document.querySelector('.player-name')

    formPlyrSettings.addEventListener('submit', (e) => {
        e.preventDefault()
        console.log('new game created!')
        mainModal.classList.add('hidden')
        btnCloseModal.click()
        
        const game = new Game(board, formPlyrSettings, playerNodeImg, playerNodeName)
    })
})
