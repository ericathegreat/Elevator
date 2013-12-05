#pragma strict

var canSpawn : Transform[];
var probabilityOfSpawnPerSecond : float = 0.1;
var queueLeft : boolean = true;
var liftShaft : scriptLiftShaft;

private var waiting : Array = new Array();
private var newWaiterOffset = 0.5;

function Start () {
	Run();
}

function Awake() {
}

function Update () {

}

function Spawn(){
	var objectToSpawn : Transform = canSpawn[ Random.Range(0, canSpawn.length) ];
	
	var newPosition = getCoordinateForQueuePosition(waiting.length);
	var walkFromPosition = newPosition;
	if(queueLeft)
	{
		walkFromPosition.x -= 1;
	}
	else
	{
		walkFromPosition.x += 1;
	}

	var newPassenger = Instantiate(objectToSpawn, walkFromPosition, this.transform.rotation);
	iTween.MoveTo(newPassenger.gameObject,{"position": newPosition,
						   "speed": 1,
						   "easetype":"linear",
						   "onstart":"StartWalk",
						   "oncomplete":"StopWalk"});
	
	var destination = Random.Range(
			0 - liftShaft.floorsBelowGround.length, 
			liftShaft.floorsAboveGround.length);
	
	newPassenger.GetComponent(scriptPassenger).destinationFloor = destination;
			
	waiting.Push(newPassenger);
}

function Run()
{

	while(true)
	{
		if(Random.value < probabilityOfSpawnPerSecond)
		{
			Spawn();
		}
		yield WaitForSeconds(1);
	}
}

function getCoordinateForQueuePosition(positionInQueue : int ) : Vector3
{
	var newPosition = this.transform.position;
	
	if(queueLeft)		
	{			
		newPosition.x -= (newWaiterOffset * positionInQueue);		
	}		
	else
	{			
		newPosition.x += (newWaiterOffset * positionInQueue);		
	}		
	return newPosition;
}

function CollectPassengers(spaceInLift : int) : Array {

	var nowBoarding = new Array();
	for(var i=0; i<spaceInLift; i++)
	{
		if(waiting.length > 0)
		{
			var p = waiting.Shift();
			nowBoarding.Push(p);
		}
	}
	
	for(i=0; i<waiting.length; i++)
	{
		var passenger : Transform = waiting[i] as Transform;
		iTween.MoveTo(passenger.gameObject,{"position": getCoordinateForQueuePosition(i),
								   "speed": 1,
								   "easetype":"linear",
								   "onstart":"StartWalk",
								   "oncomplete":"StopWalk"});
	}
	return nowBoarding;
}