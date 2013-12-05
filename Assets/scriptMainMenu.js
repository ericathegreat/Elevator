#pragma strict

var skin : GUISkin;

var unlockLevel2 : int = 10;
var unlockLevel3 : int = 10;

var lift1 : scriptLift;
var lift2 : scriptLift;

function Start () {

}

function OnGUI () {
	GUI.skin = skin;
	
	GUILayout.BeginArea(Rect (Screen.width/5, Screen.height/5 * 2, Screen.width/5 * 3, Screen.height/5 * 2));
	
		if(GUILayout.Button("Tutorial"))
		{
			Application.LoadLevel("Tutorial");
		}
		
		if(PlayerPrefs.GetInt("Tutorial Complete", 0) == 0)
		{
			GUI.enabled = false;
		}
		
    	GUILayout.FlexibleSpace();
    			
		var lvl1HighScore : int = PlayerPrefs.GetInt("High Score 1", 0);
		if(GUILayout.Button("Level 1\n (High Score: " + lvl1HighScore +")"))
		{
			World.storeScoreAs = "High Score 1";
			Application.LoadLevel("Level1");
		}
		
    	GUILayout.FlexibleSpace();
		
		if(lvl1HighScore < unlockLevel2)
		{
			GUI.enabled = false;
		}
		
		var lvl2HighScore : int = PlayerPrefs.GetInt("High Score 2", 0);
		if(GUILayout.Button("Level 2\n (High Score: " + lvl2HighScore +")"))
		{
			World.storeScoreAs = "High Score 2";
			Application.LoadLevel("Level2");
		}
		
    	GUILayout.FlexibleSpace();
		
		
		if(lvl2HighScore < unlockLevel3)
		{
			GUI.enabled = false;
		}
		
		var lvl3HighScore : int = PlayerPrefs.GetInt("High Score 3", 0);
		if(GUILayout.Button("Level 3\n (High Score: " + lvl3HighScore +")"))
		{
			World.storeScoreAs = "High Score 3";
			Application.LoadLevel("Level3");
		}
	GUILayout.EndArea();
}

function Update () {
	if(lift1.destinations.length == 0)
	{
		lift1.RandomFloor();
	}
	if(lift2.destinations.length == 0)
	{
		lift2.RandomFloor();
	}
	
}