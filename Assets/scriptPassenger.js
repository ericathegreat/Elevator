#pragma strict

var destinationFloor : int;

var patience : int;
var secondsPerPatienceDecay: int = 5;
var arrivedAtDestination: AudioClip;

function Start () 
{
	DecayPatience();
}

function Update () 
{
}	

function StartWalk()
{
	GetComponent(tk2dAnimatedSprite).Play("walk");
}

function StopWalk()
{
	GetComponent(tk2dAnimatedSprite).Play("blink");
}	

function Disembark()
{
	GetComponent(tk2dAnimatedSprite).Play("walk");
	audio.PlayOneShot(arrivedAtDestination);
	World.points ++;
}

function StandInLift()
{
	GetComponent(tk2dAnimatedSprite).Play("idle");
}

function CompleteTravel()
{
	Destroy(gameObject);
}

function DecayPatience()
{
	while(patience >= 0)
	{
		yield WaitForSeconds(secondsPerPatienceDecay);
		patience --;
	}
	return;
}