def sequence(a,b):   
    import serial
    import time

    # Define the serial port and baud rate
    serial_port = 'COM3'  # Replace with your actual serial port
    
    baud_rate = 9600  # Make sure it matches the baud rate of your microcontroller

    # Initialize serial communication
    ser = serial.Serial(serial_port, baud_rate, timeout=1)

    # Wait for the serial connection to be established
    time.sleep(2)  # Adjust this delay based on your microcontroller initialization time

    commands = ["s"]
    for i in range(a):
        commands.append("a")
    for i in range(b):
        commands.append("b")

    commands.append("y")

    def send_command(command):
        # Send command to microcontroller
        ser.write(command.encode())
        print(f"Sent command: {command}")

    # Example commands

   


    try:
        time.sleep(1)
        for command in commands:
            send_command(command)
            #print(command)
            time.sleep(1)  # Delay between commands, adjust as needed
    except KeyboardInterrupt:
        print("Keyboard interrupt detected. Closing serial connection.")
        #ser.close()

#sequence(2,3)