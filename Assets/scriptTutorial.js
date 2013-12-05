#pragma strict

var skin : GUISkin;

var tutorialArrow : GameObject;
var elevatorArrow : GameObject;
var passengerArrow : GameObject;
var controlPanelArrow : GameObject;
var passengerListArrow : GameObject;
var destinationArrow : GameObject;
var scoreArrow : GameObject;
var timeArrow : GameObject;

var queueToSpawn : scriptQueue;
var controlUI : scriptTutorialUI;
var lift : scriptLift;

private var state : int = 0;

private var text : String = "The computer running our elevator is playing up. Please help to get all the people to the right floors!";


function Start () 
{
	elevatorArrow.renderer.enabled = false;
	passengerArrow.renderer.enabled = false;
	controlPanelArrow.renderer.enabled = false;
	passengerListArrow.renderer.enabled = false;
	destinationArrow.renderer.enabled = false;
	scoreArrow.renderer.enabled = false;
	timeArrow.renderer.enabled = false;
	
}

function Awake()
{
	iTween.PunchPosition(tutorialArrow, new Vector3(2,0,0), 2);
}

function OnGUI () {
	GUI.skin = skin;
	GUILayout.BeginArea(Rect (Screen.width/6 * 3, Screen.height/4, Screen.width/5 * 2, Screen.height/4 * 2));
		GUILayout.BeginVertical();
		
			if(text.length > 0)
			{
				GUILayout.TextArea(text);
			}
		
			if(GUILayout.Button("Next"))
			{
				state++;
				EnterState(state);
			}
			
		GUILayout.EndVertical();
	GUILayout.EndArea();
}

function EnterState(state : int)
{
	if (state == 1)
	{
		tutorialArrow.renderer.enabled = false;
		elevatorArrow.renderer.enabled = true;
		iTween.PunchPosition(elevatorArrow, new Vector3(2,0,0), 2);
		text = "This is the elevator. It's at level 0 at the moment, which is the ground floor.";
	}
	else if (state == 2)
	{
		elevatorArrow.renderer.enabled = false;
		passengerArrow.renderer.enabled = true;
		iTween.PunchPosition(passengerArrow, new Vector3(2,0,0), 2);
		queueToSpawn.Spawn();
		text = "This is a passenger. To pick a passenger up, you need to send the elevator to the floor where he is waiting.";
	}
	else if (state == 3)
	{
		passengerArrow.renderer.enabled = false;
		controlPanelArrow.renderer.enabled = true;
		iTween.PunchPosition(controlPanelArrow, new Vector3(2,0,0), 2);
		controlUI.direction = "+";
		controlUI.distance = 6;
		text = "To move the elevator, you can use this control panel. \n\nTo move up, you need to choose '+', then how many floors to travel. \n\nTo get from level 0 to level 6, you need to enter +, then 6. \n\n(0 + 6 = 6)";
	}
	else if (state == 4)
	{
		lift.destinations.Push(6);
		controlPanelArrow.renderer.enabled = false;
		var passengers : scriptPassenger[] = FindObjectsOfType(scriptPassenger) as scriptPassenger[];
		passengers[0].destinationFloor = 2;
		controlUI.direction = null;
		controlUI.distance = controlUI.nullDistance;
		text = "The elevator will move up to the floor.";
	}
	else if (state == 5)
	{
		passengerListArrow.renderer.enabled = true;
		iTween.PunchPosition(passengerListArrow, new Vector3(2,0,0), 2);
		text = "You can see what floors your passengers want to get to in this box.\n\nThis passenger wants to get to level 2.";
	}
	else if (state == 6)
	{
		passengerListArrow.renderer.enabled = false;
		controlPanelArrow.renderer.enabled = true;
		iTween.PunchPosition(controlPanelArrow, new Vector3(2,0,0), 2);
		controlUI.direction = "-";
		controlUI.distance = 4;
		text = "To move down, you need to choose ' -', then how many floors to travel. \n\nTo get from level 6 to level 2, you would need to enter -, then 4. \n\n(6 - 4 = 2)";
	}
	else if (state == 7)
	{
		lift.destinations.Push(2);
		controlPanelArrow.renderer.enabled = false;
		controlUI.direction = null;
		controlUI.distance = controlUI.nullDistance;
		scoreArrow.renderer.enabled = true;
		iTween.PunchPosition(scoreArrow, new Vector3(2,0,0), 2);
		text = "When the passenger arrives at the correct destination, you get a point! \n\nYour points are counted here at the top.";
	}
	else if (state == 8)
	{
		scoreArrow.renderer.enabled = false;
		timeArrow.renderer.enabled = true;
		iTween.PunchPosition(timeArrow, new Vector3(2,0,0), 2);
		text = "You've only got a short time to play. \n\nThe amount of time you have is shown up here.";
	}
	else if (state == 9)
	{
		timeArrow.renderer.enabled = false;
		text = "Your elevator can only hold 5 people at a time. \n\nAre you ready to see how many people you can deliver? \n\nThen click 'Next'!";
	}
	else if (state == 10)
	{
		PlayerPrefs.SetInt("Tutorial Complete", 1);
		Application.LoadLevel("menu");
	}

}

function Update () {

}