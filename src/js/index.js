document.addEventListener('DOMContentLoaded', () => {
    
    class SongFx{
        constructor(){
            this.click = new Audio('./src/songs/click.wav')
            this.lose = new Audio('./src/songs/losing.wav')
            this.start = new Audio('./src/songs/start_game.wav')
            this.win = new Audio('./src/songs/winning.wav')
        }
    }

    class Game{
        constructor(board){
            this.board = board
            this.grid = [[],[],[]]
            this.init()
        }

        init(){
            this.get_faces()
            // this.ask_player_name()
            // this.ask_player_role
            this.add_faces_clck_listener()
            this.set_game_turn()
            this.audioFxs = new SongFx()
            console.log(this.game_turn)
        }

        set_game_turn(){
            let rand = Math.floor(Math.random() * 2);
            this.game_turn = rand == 1 ? 'player' : 'machine' 
        }

        ask_player_name = () => this.player_name = prompt('Ingresa tú nickname! ')

        get_faces(){
            this.faces = this.board.querySelectorAll('div')
        }

        fill_face(event){
            this.audioFxs.click.play()
        }

        add_faces_clck_listener(){
            this.faces.forEach(node => {
                node.addEventListener('click', e => this.fill_face(e)) 
            });
        }
    }

    const board = document.querySelector('.board')   
    const game = new Game(board)
})
