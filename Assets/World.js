#pragma strict

static var time : int = 150;
static var points : int = 0;
static var lockout : boolean = false;
static var storeScoreAs : String;

var timeoutTick: AudioClip;
var timeoutOver: AudioClip;

var lockoutSeconds: int = 4;

private var lockoutCountDown : int = 0;

function Start () {

	time = 150;
	points = 0;
	lockout = false;

	CountDown();
}

function OnGUI () {
	if(lockoutCountDown > 0)
	{
		GUILayout.BeginArea(Rect (Screen.width/5, Screen.height/3, Screen.width/5 * 3, Screen.height/3));
			GUILayout.BeginVertical();
			GUILayout.Box("You've tried to go to a floor that doesn't exist! Please wait...");
			GUILayout.Box("" + lockoutCountDown + " seconds");
			GUILayout.EndVertical();
		GUILayout.EndArea();
	}
}


function CountDown()
{
	while(time > 0)
	{
		yield WaitForSeconds(1);
		
		if(lockoutCountDown == 0 && lockout == true)
		{
			print("reset");
			lockoutCountDown = lockoutSeconds;
		}
		else if(lockoutCountDown > 0)
		{
			lockoutCountDown --;
		}
	    
	    if(lockoutCountDown == 0)
	    {
	    	lockout = false;
	    }
		
		time --;
		
		if(time <= 10)
		{
			audio.PlayOneShot(timeoutTick);
		}
	}
	audio.PlayOneShot(timeoutOver);
	yield WaitForSeconds(1);
	
	if(PlayerPrefs.GetInt(storeScoreAs, 0) < points)
	{
		PlayerPrefs.SetInt(storeScoreAs, points);
	}
	
	Application.LoadLevel("gameOver");
}