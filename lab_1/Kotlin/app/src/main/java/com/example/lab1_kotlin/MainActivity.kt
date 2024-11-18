// MainActivity.kt
package com.example.lab1_kotlin

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.material3.ButtonDefaults.buttonColors
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.example.lab1_kotlin.ui.theme.CustomPink
import com.example.lab1_kotlin.ui.theme.CustomTeal
import com.example.lab1_kotlin.ui.theme.LAB1_kotlinTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            LAB1_kotlinTheme {
                MainApp()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainApp() {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Example 2: Kotlin + Compose") },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = CustomTeal, // Teal color
                    titleContentColor = Color.White
                ),
            )
        },
        content = { paddingValues ->
            // Padding from Scaffold
            ExampleUI(modifier = Modifier.padding(paddingValues))
        }
    )
}

@Composable
fun ExampleUI(modifier: Modifier = Modifier) {
    // State for TextField
    var email by remember { mutableStateOf("") }

    Box(
        contentAlignment = Alignment.Center,
        modifier = modifier.fillMaxSize()
    ) {
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center,
            modifier = Modifier.padding(16.dp)
        ) {
            // Image
            Image(
                painter = painterResource(id = R.drawable.circle_image),
                contentDescription = "Circle Image",
                modifier = Modifier
                    .size(150.dp)
            )

            Spacer(modifier = Modifier.height(20.dp))

            // First Row of Buttons
            Row(
                horizontalArrangement = Arrangement.SpaceEvenly,
                modifier = Modifier.fillMaxWidth()
            ) {
                CustomButton()
                CustomButton()
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Second Row of Buttons
            Row(
                horizontalArrangement = Arrangement.SpaceEvenly,
                modifier = Modifier.fillMaxWidth()
            ) {
                CustomButton()
                CustomButton()
            }

            Spacer(modifier = Modifier.height(16.dp))

            // TextField for Email
//            OutlinedTextField(
//                value = email,
//                onValueChange = { email = it },
//                label = { Text("Email", color = Color.Gray) },
//                colors = OutlinedTextFieldDefaults.colors(
//                    focusedBorderColor = CustomPink, // Pink color
//                    unfocusedBorderColor = Color.Gray,
//                    cursorColor = CustomPink,
//                    focusedLabelColor = Color.Gray,
//                    unfocusedLabelColor = Color.Gray
//                ),
//                keyboardOptions = KeyboardOptions.Default.copy(
//                    keyboardType = KeyboardType.Email
//                ),
//                modifier = Modifier.fillMaxWidth()
//            )

//            Alternative
            Row(
                horizontalArrangement = Arrangement.SpaceEvenly,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Email",
                    color = Color.Gray,
                    modifier = Modifier.padding(vertical = 22.dp)
                )

                Spacer(modifier = Modifier.width(10.dp))
                OutlinedTextField(
                    value = email,
                    onValueChange = { email = it },
                    label = {  },
                    colors = OutlinedTextFieldDefaults.colors(
                        focusedBorderColor = CustomPink, // Pink color
                        unfocusedBorderColor = CustomPink,
                        cursorColor = CustomPink,
                        focusedLabelColor = Color.Gray,
                        unfocusedLabelColor = Color.Gray
                    ),
                    keyboardOptions = KeyboardOptions.Default.copy(
                        keyboardType = KeyboardType.Email
                    ),
                    modifier = Modifier.fillMaxWidth()
                )
            }
        }
    }
}

@Composable
fun CustomButton() {
    Button(
        onClick = { },
        colors = buttonColors(
            containerColor = Color(0xFFD6D7D7),
            contentColor = Color.Black
        ),
        shape = MaterialTheme.shapes.small.copy(all = androidx.compose.foundation.shape.CornerSize(4.dp)),
        modifier = Modifier
            .padding(4.dp)
            .height(48.dp)
            .padding(horizontal = 8.dp), // Space between buttons
    ) {
        Text(text = "BUTTON")
    }
}