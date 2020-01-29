class Spawner
{
	constructor(game, x, y, frequency, spawnList)
	{
		this.x = x;
		this.y = y;
		this.spawnList = spawnList;
		this.frequency = frequency;

		this.game = game;
		var that = this;
		this.spawn_timer = new TimerCallBack(game, frequency, true,
			function () {
				that.spawn();
			}
		);
	}

	spawn()
	{
		let choice = Math.ceil(Math.random() * this.spawnList.length) - 1;
		let spawn = new this.spawnList[choice].constructor(this.game, this.x, this.y);
	}

	// pause() {
	// 	this.spawn_timer.pause();
	// }
	//
	// unpause() {
	// 	this.spawn_timer.unpause();
	// }
}