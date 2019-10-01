package main

import (
  "log"
  "github.com/gin-contrib/cors"
  "github.com/gin-gonic/gin"
  "github.com/jinzhu/gorm"
  _ "github.com/jinzhu/gorm/dialects/postgres"
)

type User struct {
  Id        int    `gorm:"AUTO_INCREMENT" form:"id" json:"id"`
  FirstName string `gorm:"not null" form:"first_name" json:"first_name"`
  LastName  string `gorm:"not null" form:"last_name" json:"last_name"`
}

// Connect to DB
func initDB() *gorm.DB {
  // Openning file
  db, err := gorm.Open("postgres", "host=postgres port=5432 dbname=public user=root sslmode=disable")
  db.LogMode(true)
  // Error
  if err != nil {
      panic(err)
  }
  // Creating the table
  if !db.HasTable(&User{}) {
      db.CreateTable(&User{})
      db.Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(&User{})
  }

  return db
}

// Log errors
func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}

// Group the routes
func main() {
  // initDB()
  routes := gin.Default()
  routes.Use(cors.Default())
  v1 := routes.Group("api/v1")
  {
    v1.POST("/users", PostUser)
    v1.GET("/users", GetUsers)
    v1.GET("/users/:id", GetUser)
    v1.PUT("/users/:id", UpdateUser)
    v1.DELETE("/users/:id", DeleteUser)
  }
  routes.Run(":8080")
}

func PostUser(ctx *gin.Context) {
    db := initDB()

    var user User
    ctx.Bind(&user)

    if user.FirstName != "" && user.LastName != "" {
      db.Create(&user)
      ctx.JSON(201, gin.H{"success": user})
    } else {
      ctx.JSON(422, gin.H{"error": "Fields are empty"})
    }
}

func GetUsers(ctx *gin.Context) {
  db := initDB()

  var users []User

  db.Find(&users)

  ctx.JSON(200, users)
}

func GetUser(ctx *gin.Context) {
  db := initDB()

  id := ctx.Params.ByName("id")
  var user User

  db.First(&user, id)

  if user.Id != 0 {
      ctx.JSON(200, user)
  } else {
      ctx.JSON(404, gin.H{"error": "User not found"})
  }
}

func UpdateUser(ctx *gin.Context) {
  db := initDB()

  // Get id user
  id := ctx.Params.ByName("id")
  var user User

  db.First(&user, id)

  if user.FirstName != "" && user.LastName != "" {
      if user.Id != 0 {
          var newUser User
          ctx.Bind(&newUser)

          result := User{
              Id:        user.Id,
              FirstName: newUser.FirstName,
              LastName:  newUser.LastName,
          }

          // UPDATE users SET firstname='newUser.Firstname', lastname='newUser.Lastname' WHERE id = user.Id;
          db.Save(&result)

          ctx.JSON(200, gin.H{"success": result})
      } else {
          ctx.JSON(404, gin.H{"error": "User not found"})
      }

  } else {
      ctx.JSON(422, gin.H{"error": "Fields are empty"})
  }
}

func DeleteUser(ctx *gin.Context) {
  db := initDB()

  // Get id user
  id := ctx.Params.ByName("id")
  var user User

  db.First(&user, id)

  if user.Id != 0 {
      // DELETE FROM users WHERE id = user.Id
      db.Delete(&user)

      ctx.JSON(200, gin.H{"success": "User #" + id + " deleted"})
  } else {
      ctx.JSON(404, gin.H{"error": "User not found"})
  }
}
