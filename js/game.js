	//gameScene = new Phaser.Scene('Game');

	//create the game

	//choose the size of the map
	// config = {
	// 	type: Phaser.AUTO,
	// 	width: 640,
	// 	height: 360,
	// 	scene: gameScene
	// };



	//game = new Phaser.Game(config);



	game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser', { preload: preload, create: create, update: update });




	function preload(){
		game.load.image('background', 'assets/background.png')
		game.load.image('player', 'assets/player.png')
		game.load.image('plant','assets/Tulip_Stage_1.png')
		game.load.image('plant1','assets/Tulip_Stage_2.png')
		game.load.image('plant2','assets/Tulip_Stage_3.png')
		game.load.image('plant3','assets/Tulip_Stage_4.png')
		game.load.image('plant5','assets/Tulip_Stage_6.png')
		game.load.image('blank', 'assets/dirt.png')
	}

	
	var listOfPlants = [];

	var group2;


	function create(){

		game.physics.startSystem(Phaser.Physics.ARCADE);

		bg = game.add.sprite(0, 0, 'background');
		// origin is originally set to center, change origin to the top-left of the sprite

		game.plant = game.add.group(); //creating a new plant group
		game.plant.enableBody = true; //allows interaction between the plant and user
		game.plant.physicsBodyType = Phaser.Physics.ARCADE;//one of the three types of groups

		group2 = game.add.group();

		player = game.add.sprite(70, 180, 'player') //adds the image to the field
		game.physics.enable(player, Phaser.Physics.ARCADE);

		group2.add(player);


		var wildflower1 = new createPlant(false, 0, player, false, 250, 180)
		var wildflower2 = new createPlant(false, 0, player, false, 480, 180)

		listOfPlants.push(wildflower1)
		listOfPlants.push(wildflower2)


		//create random amount of crops
		testNum = Math.floor(Math.random() * 7) + 1


		for(var x=0; x<testNum; x++){
			var flower = new createPlant(false, 0, player, false, Math.floor(Math.random() * 640) + 1, Math.floor(Math.random() * 360) + 1)
			listOfPlants.push(flower)
		}
		
		//this.add.sprite(listOfPlants[0].plant.x, listOfPlants[0].plant.y, 'plant')

		this.plant = game.input.keyboard.addKey(Phaser.Keyboard.P);

		this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
		this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

		this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
		this.killKey = game.input.keyboard.addKey(Phaser.Keyboard.K);

	}


	//continously update the game
	function update(){

		if (this.leftKey.isDown & player.x >= 0)
		{
			player.x -= 1
			grow()
		}

		if (this.rightKey.isDown & player.x <= 640)
		{
			player.x += 1
			grow()
		}

		if (this.downKey.isDown){
			if(player.y >= 0){
				player.y += 1
				grow()
			}
		}

		if (this.upKey.isDown){
			if(player.y <= 360){
				player.y -= 1
				grow()
			}
		}

		if(this.plant.isDown & !this.downKey.isDown & !this.upKey.isDown & !this.leftKey.isDown & !this.rightKey.isDown)
		{
			plantplant(player)
		}

		display()

		if(this.killKey.isDown & !this.plant.isDown & !this.downKey.isDown & !this.upKey.isDown & !this.leftKey.isDown & !this.rightKey.isDown)
		{
			for(var i = 0; i<listOfPlants.length; i++){
				killplant(listOfPlants[i])
			}

		}

		game.world.bringToTop(group2);

	}


	function display() {
		for(var x = 0; x<listOfPlants.length; x++){
			if(listOfPlants[x].death == false){
				if(listOfPlants[x].age > 0 & listOfPlants[x].age <= 99){
					var sprite = game.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant')

				}
				if(listOfPlants[x].age > 100 & listOfPlants[x].age <= 199){
					var sprite = game.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant1')
				}
				if(listOfPlants[x].age > 200 & listOfPlants[x].age <= 299){
					var sprite = game.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant2')
				}
				if(listOfPlants[x].age > 300 & listOfPlants[x].age <= 499){
					var sprite = game.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant3')
				}
				if(listOfPlants[x].age >= 500){
					var sprite = game.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant5')
				}
			}
		}
	}

	 function grow(){
		for(var y = 0; y<listOfPlants.length; y++){
			if(!listOfPlants[y].death)
				listOfPlants[y].age++
		}
	}

	 function killplant(crop){
		//you can step on your own crop and kill it
		if(player.x>crop.x-15 & player.x<crop.x+15)
			if(player.y>crop.y-15 & player.y<crop.y+15){
				crop.death = true;
				game.world.removeAll('plant')
				game.add.sprite(0, 0, 'background');
				player = game.add.sprite(player.x, player.y, 'player')
				display()


			}
	}



	
	 function wateringplant(crop, user){
		//doesn't check for left or right
		distance = Phaser.Math.Distance.Between(user.x, user.y , crop.plant.x , crop.plant.y)

		if(math.abs(distance)==1){
			crop.water = false;
		}
		
	}
	
	function createPlant(water, age, name, death, x, y){

		this.water= water, //boolean true for water
		this.age= age,		//int
		this.name= name,	//owner
		this.death= death		//true if plant is dead
		this.x = x;
		this.y = y;

	}

	 function plantplant(user){
		var flower = new createPlant(false, 0, user, false, user.x+1, user.y+1)
		listOfPlants.push(flower)
	}	
	
	