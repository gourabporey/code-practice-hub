using System.IO;

var sr = new StreamReader("TestData/sample-1.json");
var content = sr.ReadToEnd();
Console.WriteLine(content);