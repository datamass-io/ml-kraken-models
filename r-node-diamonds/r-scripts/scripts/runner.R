library("tidyverse")
library("randomForest")
library("jsonlite")

args = commandArgs(trailingOnly=TRUE)
if (length(args) < 1) {
  stop("The parameter -> diamond json to be valued.", call.=FALSE)
} 

cuts = c(1,2,3,4,5)
names(cuts) = c("Fair", "Good", "Very Good", "Premium", "Ideal")

colors = c(1,2,3,4,5,6,7)
names(colors) = c("D", "E", "F", "G", "H", "I", "J")

clarities = c(1,2,3,4,5,6,7,8)
names(clarities) = c("I1", "SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF")

diamond_json = args[1]
diamond <- fromJSON(diamond_json) 
diamond$cut <- unname(cuts[diamond$cut])
diamond$color <-unname(colors[diamond$color])
diamond$clarity <- unname(clarities[diamond$clarity])

model <- readRDS("/Users/jwszol/Documents/workspace-git/ml-kraken-models/r-node-diamonds/r-scripts/models/randomForestThin.rds")
final_predictions <- predict(model, diamond) %>% toJSON() %>% cat()

