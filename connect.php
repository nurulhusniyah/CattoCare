
<!DOCTYPE html>
<html>

<head>
    <title>Insert Page page</title>
</head>

<body>

 <?php

        servername => localhost
         username => root
     password => empty
        database name => staff

       if($_SERVER["REQUEST_METHOD"] == "POST") {
              $name =  $_POST['name'];
              $password = $_POST['password'];
              $email =  $_POST['email'];
    // do something with $name and $email
}


        $conn = mysqli_connect("localhost", "root", "", "test");

        // Check connection
              if (!$con)
                {
                    die("Connection failed!" . mysqli_connect_error());
                }else{
                   $sql = "INSERT INTO signup (name,password,email) VALUES ('$name', '$password', '$email')";

                           if(mysqli_query($conn, $sql)){
            echo "<h3>data stored in a database successfully."
                . " Please browse your localhost php my admin"
                . " to view the updated data</h3>";

            echo nl2br("\n$name\n $password\n "
                . "$email");
        } else{
            echo "ERROR: Hush! Sorry $sql. "
                . mysqli_error($conn);
        }

        // Close connection
         // close connection
         mysqli_close($con);
                }

        // Taking all 5 values from the form data(input)

        //$address = $_REQUEST['address'];
       // $email = $_REQUEST['email'];

 // Performing insert query execution
        // here our table name is college




        ?>

        </body>

</html>