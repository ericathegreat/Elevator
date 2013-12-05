#pragma strict

var passengers : Array = new Array(); //scriptPassenger[];
var destinations : Array = new Array();
var liftShaft : scriptLiftShaft;
var liftSpeed : float = 1.2;
var maxPassengers : int = 5;

var upSound: AudioClip;
var downSound: AudioClip;

private var waitAtFloor : int = 1;

private var thisFloor : int = 0;
private var nextFloor : int = 0;

function Start () {
	
	Drive();
}

function Update () {
}

function getTravellingTo()
{
	return nextFloor;
}

function getLastCalculatedDestination() : int
{
	if(destinations.length == 0)
	{
		return nextFloor;
	}
	else
	{
		return destinations[destinations.length -1];
	}
}

function RandomFloor() {
	var randomFloor : int = Random.Range(0, liftShaft.floorsAboveGround.length);
	destinations.Push(randomFloor);
}

function Drive () {

	for(var i=0; i<passengers.length ;i++)
	{
		var passenger : Transform  = passengers[i];
		passenger.GetComponent(scriptPassenger).StandInLift();
	}
		
	if(destinations.length > 0)
	{
		nextFloor = destinations.Shift();
		var destinationQueue : scriptQueue = getQueueForFloor(nextFloor);
		
		var tweenTarget = this.transform.position;
		this.transform.position.y = destinationQueue.transform.position.y;
		
		if (nextFloor > thisFloor && upSound != null)
		{
			audio.PlayOneShot(upSound);
		}
		else if(downSound != null)
		{
			audio.PlayOneShot(downSound);
		}
		iTween.MoveFrom(gameObject,{"position":tweenTarget,
								   "speed": liftSpeed,
								   "oncomplete":"ArriveAtDestination",
								   "easetype":"easeOutQuad"});
	}
	else
	{
		ArriveAtDestination();
	}
}

function getQueueForFloor(floor : int) : scriptQueue
{
	if(floor < 0)
	{
		return liftShaft.floorsBelowGround[Mathf.Abs(floor) - 1];
	}
	else
	{
		return liftShaft.floorsAboveGround[Mathf.Abs(floor)];
	}
}


function ArriveAtDestination () {
	thisFloor = nextFloor;
	DeliverPassengers ();
	CollectPassengersAndDrive ();
}

function DeliverPassengers () {
	var disembarked : int = 0;
	for(var i=passengers.length; i> 0; i--)
	{
		var passenger : Transform = passengers[i - 1];
    	if(passenger.GetComponent(scriptPassenger).destinationFloor == thisFloor)
    	{
    		var finishedPassenger : Transform = passengers[i-1];
    		finishedPassenger.parent = null;
    		passengers.RemoveAt(i-1);
    		
			var newPosition = this.transform.position;
			newPosition.x -= 1;	
    		
			iTween.MoveTo(finishedPassenger.gameObject,{"position": newPosition,
									   "speed": 1,
									   "easetype":"linear",
								   	   "delay": disembarked * 0.5,
									   "onstart":"Disembark",
									   "oncomplete":"CompleteTravel"});
			disembarked ++;
    	}
    }
}



function CollectPassengersAndDrive() {
	var queue = getQueueForFloor(thisFloor);
	var newPassengers = queue.CollectPassengers(maxPassengers - passengers.length);
	if(newPassengers.length > 0)
	{
		for(var i=0; i<newPassengers.length ;i++)
		{
			var passenger : Transform  = newPassengers[i];
			passenger.transform.parent = this.transform;
			passengers.Push(passenger);
		}
		
		var targetPosition : Vector3 = this.transform.position;
			targetPosition.x += Random.Range(-0.2, 0.2);
			
		for(i=0; i<newPassengers.length - 1 ;i++)
		{
			passenger = newPassengers[i];
			iTween.MoveTo(passenger.gameObject,{"position": targetPosition,
									   "speed": 1,
									   "easetype":"linear",
									   "onstart":"StartWalk",
									   "oncomplete":"StopWalk"});
			targetPosition = this.transform.position;
			targetPosition.x += Random.Range(-0.2, 0.2);
		}
			
		passenger = newPassengers[newPassengers.length-1];
		iTween.MoveTo(passenger.gameObject,{"position": targetPosition,
									   "speed": 1,
									   "easetype":"linear",
								   	   "onstart":"StartWalk",
								   	   "oncomplete":"Drive",
								   	   "oncompletetarget": this.gameObject});
	}
	else
	{
		yield WaitForSeconds(waitAtFloor);
		Drive();
	}
}