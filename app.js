document.addEventListener('DOMContentLoaded', () => {
    // card options
    // @author:Yeasin Arafat
    let cardObj = {},
        cardArray = [],
        showObj = () => {
            for (let prop in cardObj) {
                cardArray.push(cardObj[prop]);
            }
            new MemoryGame(cardArray, 60);
        };
    fetch('data.json')
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            cardObj = data;
            showObj();
        });
});
class MemoryGame {
    constructor(cardArray, duration) {
        this.duration = duration,
            this.cardArray = cardArray;
        this.CreatElement(),
            this.default();
    }
    creatCard() {
        for (let i = 0; i < this.cardArray.length; i++) {
            var card = document.createElement('i');
            card.classList.add('black');
            card.setAttribute('data-id', i);
            this.grid.appendChild(card);
        }

    }
    flipCard(card) {
        var cardId = card.getAttribute('data-id');
        this.cardChosen.push(this.cardArray[cardId].name);
        this.cardChosenId.push(cardId);
        card.classList.remove('black');
        card.classList.add('fas', this.cardArray[cardId].class);
        if (this.cardChosen.length == 2) {
            setTimeout(() => { this.checkForMatch() }, 500);
        }
    }
    checkForMatch() {
        if (this.cardChosen[0] === this.cardChosen[1]) {
            // alert('You found a match');
            this.cards[this.cardChosenId[0]].classList.remove(this.cards[this.cardChosenId[0]].classList[0], this.cards[this.cardChosenId[0]].classList[1]);
            this.cards[this.cardChosenId[0]].classList.add('white');
            this.cards[this.cardChosenId[1]].classList.remove(this.cards[this.cardChosenId[1]].classList[0], this.cards[this.cardChosenId[1]].classList[1]);
            this.cards[this.cardChosenId[1]].classList.add('white');
            this.cardsWon.push(this.cardChosen);
        } else {
            // console.log(optionOneId, cardChosenId[1]);
            this.cards[this.cardChosenId[0]].classList.remove(this.cards[this.cardChosenId[0]].classList[0], this.cards[this.cardChosenId[0]].classList[1]);
            this.cards[this.cardChosenId[0]].classList.add('black');
            this.cards[this.cardChosenId[1]].classList.remove(this.cards[this.cardChosenId[1]].classList[0], this.cards[this.cardChosenId[1]].classList[1]);
            this.cards[this.cardChosenId[1]].classList.add('black');
            // alert('Sorry, Try again');
        }
        this.cardChosen = [];
        this.cardChosenId = [];
        this.resultDisplay.textContent = this.cardsWon.length;
        if (this.cardsWon.length === this.cardArray.length / 2) {
            document.querySelector('.alert-success').classList.add('active');
            clearInterval(this.interval);
            this.timerDisplay.textContent = '0:00';
            setTimeout(() => {
                this.overlay.classList.add('active');
                document.querySelector('.alert-success').classList.remove('active');
                this.menuBox.classList.add('active');
                this.resetCon();
            }, 3000);
        }
    }
    resetCon() {
        this.cardChosen = [],
            this.cardChosenId = [],
            this.cardsWon = [],
            this.resultDisplay.textContent = 0,
            this.countTime = 0;
        clearInterval(this.interval);
        // this.startTime();
        this.cardArray.sort(() => 0.5 - Math.random());
        this.cards.forEach((card) => {
            if (!card.classList.contains('white') || !card.classList.contains('black')) {
                card.classList.remove(card.classList[0], card.classList[1]);
                card.classList.add('black');
            } else if (card.classList.contains('white')) {
                card.classList.remove('white');
                card.classList.add('black');
            }
        });
    }
    startTime() {
        this.countTime = this.duration;
        var minutes, seconds;
        minutes = parseInt(this.countTime / 60, 10);
        seconds = parseInt(this.countTime % 60, 10);
        seconds = seconds < 10 ? '0' + seconds : seconds;
        this.timerDisplay.textContent = minutes + ':' + seconds;
        this.startIn(this.countTime);
    }
    startIn(timer) {
        this.interval = setInterval(() => {
            var minutes, seconds;
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            seconds = seconds < 10 ? '0' + seconds : seconds;
            this.timerDisplay.textContent = minutes + ':' + seconds;
            this.countTime = timer;
            if (--timer < 0) {
                if (this.cardsWon.length < this.cardArray.length / 2) {
                    this.resetCon();
                    document.querySelector('.alert-feaild').classList.add('active');
                    setTimeout(() => {
                        this.overlay.classList.add('active');
                        document.querySelector('.alert-feaild').classList.remove('active');
                        this.menuBox.classList.add('active');
                    }, 2000);
                }
            }
        }, 1000);
    }
    CreatElement() {
        this.overlay = document.createElement('div'),
            this.grid = document.createElement('div'),
            this.menuBox = document.createElement('div');
        const successBox = document.createElement('div'),
            feaildBox = document.createElement('div'),
            menuBtn = document.createElement('div'),
            timeScorBox = document.createElement('div'),
            gameBox = document.querySelector('.gameBox');
        this.lableDisplay = document.querySelector('[data-lable]');
        this.grid.classList.add('grid'),
            this.grid.setAttribute('data-game-box', '');
        this.overlay.classList.add('overlay'),
            this.overlay.setAttribute('data-overlay', '');
        successBox.classList.add('message-box', 'alert-success'),
            successBox.innerHTML = '<div class="icon-box"><i class="fas fa-check-circle"></i></div><div class="messsage">Congratulations! You found them all!</div>';
        feaildBox.classList.add('message-box', 'alert-feaild'),
            feaildBox.innerHTML = '<div class="icon-box"><i class="fas fa-check-circle"></i></div><div class="messsage">Feaild! You can\'t found them all!</div>';
        this.menuBox.classList.add('menu-box'),
            this.menuBox.setAttribute('data-menu-box', ''),
            this.menuBox.innerHTML = '<button class="btn play" data-play><i class="fas fa-play-circle"></i><samp>Start</samp></button><button class="btn reset" data-reset><i class="fas fa-circle-notch"></i><samp>reset</samp></button>';
        timeScorBox.classList.add('reti'),
            timeScorBox.innerHTML = '<h3>Score: <samp id="result" data-result>0</samp></h3><h3>Time: <samp id="time" data-time>0:00</samp></h3>';
        menuBtn.classList.add('btn', 'menu'),
            menuBtn.setAttribute('data-menu', ''),
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.querySelector('body').append(successBox, feaildBox, this.menuBox);
        gameBox.appendChild(this.grid);
        gameBox.insertBefore(timeScorBox, this.grid);
        gameBox.insertBefore(menuBtn, timeScorBox),
            this.grid.appendChild(this.overlay);
    }
    default () {

        this.resultDisplay = document.querySelector('[data-result]'),
            this.timerDisplay = document.querySelector('[data-time]');
        for (var i = 0; i < (this.Length / 2); i++) {
            this.cardArray.push(this.cardArray2[i]);
        }
        this.cardArray.forEach(card => {
                this.cardArray.push(card);
            }),
            this.cardArray.sort(() => 0.5 - Math.random(this.Length)),
            this.menuBox.classList.add('active'),
            this.overlay.classList.add('active'),
            this.resultDisplay.textContent = 0,
            this.timerDisplay.textContent = ' 0:00',
            this.creatCard(),
            this.cards = document.querySelectorAll('.grid i'),
            this.cardChosen = [],
            this.cardChosenId = [],
            this.cardsWon = [],
            this.interval, this.countTime = this.duration;
        this.grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('black') && this.cardChosen.length < 2) {
                this.flipCard(e.target);
            }
        });
        document.querySelector('[data-menu]').addEventListener('click', (e) => {
            this.menuBox.classList.add('active');
            this.overlay.classList.add('active');
            clearInterval(this.interval);
        });
        document.querySelector('[data-play]').addEventListener('click', (e) => {
            this.menuBox.classList.remove('active');
            this.overlay.classList.remove('active');
            if (this.countTime == 0) {
                this.startTime();
                this.countTime = this.duration;
            } else { this.startIn(this.countTime); }
        });
        document.querySelector('[data-reset]').addEventListener('click', (e) => {
            this.resetCon(),
                this.startTime(),
                this.menuBox.classList.remove('active'),
                this.overlay.classList.remove('active');
        });
    }

}