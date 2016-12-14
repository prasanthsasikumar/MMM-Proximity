# Module: MMM-Proximity
The `MMM-Proximity` program is a <a href="https://github.com/MichMich/MagicMirror">MagicMirror</a> addon module.
This module uses 2 HC-SR04 ultrasonic sensors to determing hand position to produce a "Proximity Left", "Proximity Right", or "Press"

## Installing the module
1. Navigate into your MagicMirror's `modules` folder and execute `git clone https://github.com/mochman/MMM-Proximity.git`.  A new folder labeled `MMM-Proximity` will appear, cd into it.
2. Execute `npm install` to install the dependencies
3. You will need to run `sudo npm start` instead of `npm start` in order to read/write to the GPIO pins.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'MMM-Proximity',
		position: 'bottom_left',	// Doesn't matter after it's setup.  It should be blank.
									// Best results in one of the side regions like: bottom_left
		config: {
			// See 'Configuration options' for more information.
			echoLeftPin: 24, 		//Left Sensor's BCM Numbered Echo pin - REQUIRED
			triggerLeftPin: 23, 	//Left Sensor's BCM Numbered trigger pin - REQUIRED
			echoRightPin: 26, 		//Right Sensor's BCM Numbered Echo pin - REQUIRED
			triggerRightPin: 25, 	//Right Sensor's BCM Numbered trigger pin - REQUIRED
			useAsButton: false,		//Enable a GPIO output when you "press".
			buttonPin: 8,
			verbose: false,		
			calibrate: false
		}
	}
]
````

This module will use the `sendNotification(notification, payload)` to send:<br>
`notification = 'MOVEMENT'`<br>
`payload = 'Proximity Left'`, `'Proximity Right'`, or `'Press'`

Please use as appropriate in your module using `notificationReceived(notification, payload, sender)`

## Wiring the Sensors

<b>Please wire the sensors using this diagram.</b>
![Example: hcsr04.png] (https://raw.githubusercontent.com/clebert/r-pi-usonic/master/resources/hcsr04.png)

Remember to use the GPIO numbers, not actual pins.  For example, if you want to use the defaults and you have a Raspberry Pi 2/3, echoLeftPin should be on GPIO24 (which is physical pin 18, etc...).

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>echoLeftPin</code></td>
			<td>Left Sensor's Echo pin.<br>
				<br><b>Example:</b> <code>24</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>echoRightPin</code></td>
			<td>Right Sensor's Echo pin.<br>
				<br><b>Example:</b> <code>23</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>triggerLeftPin</code></td>
			<td>Left Sensor's Trigger pin.<br>
				<br><b>Example:</b> <code>26</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>triggerRightPin</code></td>
			<td>Right Sensor's Echo pin.<br>
				<br><b>Example:</b> <code>25</code>
				<br> This value is <b>REQUIRED</b>
			</td>
		</tr>
		<tr>
			<td><code>useAsButton</code></td>
			<td>If you want to enable a GPIO output when you "press", change this to true<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default Value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>triggerRightPin</code></td>
			<td>GPIO pin that will be activated when you "press" the sensors.<br>
				<br><b>Example:</b> <code>8</code>
				<br> This value is <b>REQUIRED if you enable useAsButton</b>
			</td>
		</tr>
		<tr>
			<td><code>leftDistance</code></td>
			<td>Distance in cm that will initiate the movement detection with the left sensor<br>
				<br><b>Example:</b> <code>20</code>
				<br><b>Default Value:</b> <code>20</code>
			</td>
		</tr>
		<tr>
			<td><code>rightDistance</code></td>
			<td>Distance in cm that will initiate the movement detection with the right sensor<br>
				<br><b>Example:</b> <code>20</code>
				<br><b>Default Value:</b> <code>20</code>
			</td>
		</tr>
		<tr>
			<td><code>verbose</code></td>
			<td>Will display Proximity data to the screen for checking<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default Value:</b> <code>false</code>
			</td>
		</tr>
		<tr>
			<td><code>calibrate</code></td>
			<td>This will dispay the distances read by your sensors so you can use a <code>leftDistance</code> & <code>rightDistance</code> that works for you.<br>
				<br><b>Example:</b> <code>true</code>
				<br><b>Default Value:</b> <code>true</code>
			</td>
		</tr>
	</tbody>
</table>
