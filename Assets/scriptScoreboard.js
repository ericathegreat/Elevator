#pragma strict

var skin : GUISkin;

function Start () {
	var textMesh = GetComponent(tk2dTextMesh);
	textMesh.text = "" + World.points + " points";
	textMesh.Commit();
}

function OnGUI() {
	GUI.skin = skin;
	if(GUI.Button(new Rect(Screen.width/4, Screen.height/5 * 3, Screen.width/4*2, Screen.height/7),"Play again"))
	{
		Application.LoadLevel("menu");
	}
}

function Update () {

}