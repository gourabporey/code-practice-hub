class Student {
   constructor(name) {
      this.name = name;
   }

   [Symbol.for('+')](other) {
      return this.name + other.name;
   }
}

const addStudentsName = function () {

   const st1 = new Student('gourab');
   const st2 = new Student('sourov');
   // console.log(st1 + st2);
   console.log(st1 + st2);
}

addStudentsName();