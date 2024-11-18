import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: const Text("Example 4: Flutter"),
          foregroundColor: Colors.white,
          backgroundColor: Colors.teal,
          centerTitle: false,
        ),
        body: const ExampleUI(),
      ),
    );
  }
}

class ExampleUI extends StatelessWidget {
  const ExampleUI({super.key});

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            '/Users/pascal/Documents/Repositories/Uni/TDDC73/lab_1/flutter/flutter_application_1/assets/circle_image.png', // Adjust path if needed
            width: 150,
            height: 150,
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () {},
                child: const Text("BUTTON"),
                style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.black,
                    backgroundColor: Color(0xFFD6D7D7),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(4), // Less rounded corners
                    )),
              ),
              ElevatedButton(
                onPressed: () {},
                child: const Text("BUTTON"),
                style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.black,
                    backgroundColor: Color(0xFFD6D7D7),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(4), // Less rounded corners
                    )),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () {},
                child: const Text("BUTTON"),
                style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.black,
                    backgroundColor: Color(0xFFD6D7D7),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(4), // Less rounded corners
                    )),
              ),
              ElevatedButton(
                onPressed: () {},
                child: const Text("BUTTON"),
                style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.black,
                    backgroundColor: Color(0xFFD6D7D7),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius.circular(4), // Less rounded corners
                    )),
              ),
            ],
          ),
          const Padding(
            padding: EdgeInsets.all(16.0),
            child: TextField(
              decoration: InputDecoration(
                labelText: "Email",
                border: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.pink),
                ),
                enabledBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.pink),
                ),
                focusedBorder: UnderlineInputBorder(
                  borderSide: BorderSide(color: Colors.pink),
                ),
                labelStyle: TextStyle(color: Colors.grey),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
