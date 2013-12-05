#pragma strict

var floorsAboveGround : scriptQueue[];
var floorsBelowGround : scriptQueue[];

var autoSpawnOnStart : boolean = true;

function Start () 
{
	if(autoSpawnOnStart)
	{
		var toSpawn = Random.Range(0, floorsAboveGround.length);
		floorsAboveGround[toSpawn].Spawn();
	}
}

function Update () {

}