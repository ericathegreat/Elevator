#pragma strict

var skin : GUISkin;

var xTop : int = 50;
var yTop : int= 50;

var passengerHeight : int= 50;
var hudHeight : int= 50;
var ctlHeight : int= 50;

var width : int= 150;

var lift : scriptLift;

var nullDistance = 99999;

private var scrollPosition : Vector2;

var direction : String = null;
var distance : int = nullDistance;

var UnclickedButtonGuiStyle : GUIStyle;
var ClickedButtonGuiStyle : GUIStyle;

function OnGUI () {
	GUI.skin = skin;
	
	if(World.lockout)
	{
		GUI.enabled = false;
	}
	
	var xRatio = Screen.width /1024.0 ;
    var yRatio = Screen.height / 768.0 ;
    
    GUILayout.Window (0, Rect (xTop * xRatio, yTop * yRatio, width * xRatio, passengerHeight * yRatio - 2), DrawCurrentPassengers, "Current Passengers");
    
    GUILayout.Window (1, Rect (xTop * xRatio,(yTop + passengerHeight + hudHeight) * yRatio, width * xRatio, ctlHeight * yRatio), DrawControls, "How far to move?");
    
        
    GUILayout.BeginArea(Rect(xTop * xRatio, 20 * yRatio, width * xRatio, 120 * yRatio));
    	GUILayout.BeginVertical();
    
	    	GUILayout.BeginHorizontal ("box");
	    		GUILayout.Label("Score :");
	    		GUILayout.Box("" + World.points);
	    	GUILayout.EndHorizontal();
	    	
	    	GUILayout.BeginHorizontal ("box");
	    		GUILayout.Label("Time :");
	    		GUILayout.Box("180");// + World.time);
	    	GUILayout.EndHorizontal();
    	GUILayout.EndVertical();
    	
    GUILayout.EndArea();
    
    GUI.enabled = true;
}


function DrawCurrentPassengers()
{
    // Current passengers
    GUILayout.BeginVertical ("box");
		GUILayout.BeginHorizontal();
			for(var i : int = 0; i< lift.maxPassengers; i++)
			{
				if(i < lift.passengers.length)
				{
					var passenger : Transform = lift.passengers[i];
					GUILayout.Box("" + passenger.GetComponent(scriptPassenger).destinationFloor);
				}
				else
				{
					GUILayout.Box(" ");
				}
			}
		GUILayout.EndHorizontal();

	GUILayout.EndVertical ();
	
	DrawDestination(nullDistance, lift.getTravellingTo());
}

function DrawControls()
{
	var range : int = lift.liftShaft.floorsAboveGround.length + lift.liftShaft.floorsBelowGround.length;
		
    // Current passengers
    GUILayout.BeginVertical ("box", GUILayout.ExpandHeight(false));
		GUILayout.BeginHorizontal();
    		GUILayout.FlexibleSpace();
			GUILayout.BeginVertical();
    			GUILayout.FlexibleSpace();
    			
    			var plusStyle;
    			var minusStyle;
    			if(direction == "+")
    			{
    				plusStyle = ClickedButtonGuiStyle;
    				minusStyle = UnclickedButtonGuiStyle;
    			}
    			else if (direction == "-")
    			{
    				plusStyle = UnclickedButtonGuiStyle;
    				minusStyle = ClickedButtonGuiStyle;
    			}
    			else
    			{
    				plusStyle = UnclickedButtonGuiStyle;
    				minusStyle = UnclickedButtonGuiStyle;
    			}
    			
				if(GUILayout.Button("+", plusStyle, GUILayout.Width(30)))
				{
					//direction = "+";
					//HandleDestination();
				}
				if(GUILayout.Button("-", minusStyle, GUILayout.Width(30)))
				{
					//direction = "-";
					//HandleDestination();
				}
    			GUILayout.FlexibleSpace();
			GUILayout.EndVertical();
    		
			GUILayout.BeginVertical();
				for(var i : int = 1; i< range; )
				{
					GUILayout.BeginHorizontal();
					for(var j : int = 0; j < 3; j++)
					{
					
		    			var style;
		    			if(distance == i)
		    			{
		    				style = ClickedButtonGuiStyle;
		    			}
		    			else
		    			{
		    				style = UnclickedButtonGuiStyle;
		    			}
					
						if(GUILayout.Button("" + i, style, GUILayout.Width(30)))
						{
							//distance = i;
							//HandleDestination();
						}
						i++;
					}
					GUILayout.EndHorizontal();
				}
			GUILayout.EndVertical();
			
    		GUILayout.FlexibleSpace();
		GUILayout.EndHorizontal();
		
	GUILayout.EndVertical ();
}

function HandleDestination()
{
	/*if(direction != null && distance != nullDistance)
	{
		var destination : int;
		
		if(direction == "+")
		{
			destination = lift.getLastCalculatedDestination() + distance;
		}
		else
		{
			destination = lift.getLastCalculatedDestination() - distance;
		}
		
		if(lift.liftShaft.floorsAboveGround.length > destination && (0 - lift.liftShaft.floorsBelowGround.length) <= destination)
		{
			lift.destinations.Push(destination);
		}
		else
		{
			World.lockout = true;
		}
		
		direction = null;
		distance = nullDistance;
	}*/
}


function DrawDestination(fromFloor : int, toFloor : int)
{
	GUILayout.BeginHorizontal();
	
    // This button will size to fit the window
    if(fromFloor == nullDistance)
    {
	    GUILayout.Box("Now travelling to..."); 
    }
    else
    {
    	GUILayout.Box("" + fromFloor, GUILayout.Width(25), GUILayout.ExpandWidth(false)); 
    	GUILayout.Box("+"); 
    	GUILayout.Box("" + (toFloor - fromFloor), GUILayout.Width(25), GUILayout.ExpandWidth(false)); 
    	GUILayout.Box("="); 
    	
    }
    GUILayout.FlexibleSpace();
    
    GUILayout.Box("" + toFloor, GUILayout.Width(25), GUILayout.ExpandWidth(false));  
          
    GUILayout.EndHorizontal();
}



function Start () 
{
}

function Update () {

}