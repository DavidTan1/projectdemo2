	gameScene = new Phaser.Scene('Game');
	//create the game

	//choose the size of the map
	config = {
		type: Phaser.AUTO,
		width: 640,
		height: 360,
		scene: gameScene
	};

	game = new Phaser.Game(config);


	gameScene.preload = function(){
		this.load.image('background', 'assets/background.png')
		this.load.image('player', 'assets/player.png')
		this.load.image('plant','assets/Tulip_Stage_1.png')
		this.load.image('plant1','assets/Tulip_Stage_2.png')
		this.load.image('plant2','assets/Tulip_Stage_3.png')
		this.load.image('plant3','assets/Tulip_Stage_4.png')
		this.load.image('plant5','assets/Tulip_Stage_6.png')
		this.load.image('blank', 'assets/dirt.png')

	}

	
	var listOfPlants = [];
	
	var right;
	var plant;
	var kill;
	var left;
	var up;
	var down;


	gameScene.create = function(){

		let bg = this.add.sprite(0, 0, 'background');
		// origin is originally set to center, change origin to the top-left of the sprite
		bg.setOrigin(0,0);

		//this.background = this.add.sprite(0,0,'background')
	
	
		this.plant = this.add.group(); //creating a new plant group
		this.plant.enableBody = true; //allows interaction between the plant and user
		this.plant.physicsBodyType = Phaser.Physics.ARCADE;//one of the three types of groups
		
	
		player = this.add.sprite(70, 180, 'player') //adds the image to the field





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
		

		right = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		left = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		up = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		down = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
		plant = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
		kill = gameScene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);


	}

	
	//continously update the game
	gameScene.update = function(){

		if(kill.isDown & !plant.isDown & !down.isDown & !up.isDown & !left.isDown & !right.isDown)
		{
			for(var i = 0; i<listOfPlants.length; i++){
				killplant(listOfPlants[i])
			}
		}

			if (right.isDown){
			if(player.x <= 640){
				player.x += 1
				grow()
			}
		}

		if (left.isDown){
			if(player.x >= 0){
				player.x -= 1
				grow()
			}
		}

		if (up.isDown){
			if(player.y >= 0){
				player.y -= 1
				grow()
			}
		}

		if (down.isDown){
			if(player.y <= 360){
				player.y += 1
				grow()
			}
		}

		if (plant.isDown & !down.isDown & !up.isDown & !left.isDown & !right.isDown){
			plantplant(player)
		}

		for(var x = 0; x<listOfPlants.length; x++){
			if(listOfPlants[x].death == false){
				if(listOfPlants[x].age == 0){
					this.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant')

				}
				if(listOfPlants[x].age == 100){
					this.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant1')
				}
				if(listOfPlants[x].age == 200){
					this.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant2')
				}
				if(listOfPlants[x].age == 300){
					this.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant3')
				}
				if(listOfPlants[x].age == 400){
					this.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'plant5')
				}
			}else{
				this.add.sprite(listOfPlants[x].x, listOfPlants[x].y,'blank')
			}
		}
	}
	

	grow = function(){
		for(var y = 0; y<listOfPlants.length; y++){
			if(!listOfPlants[y].death)
				listOfPlants[y].age++
		}
	}

	killplant = function(crop){
		//you can step on your own crop and kill it
		if(player.x>crop.x-15 & player.x<crop.x+15)
			if(player.y>crop.y-15 & player.y<crop.y+15)
				crop.death = true;
	}



	
	wateringplant = function(crop, user){
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

	plantplant = function(user){
		var flower = new createPlant(false, 0, user, false, user.x+1, user.y+1)
		listOfPlants.push(flower)
	}	
	
	