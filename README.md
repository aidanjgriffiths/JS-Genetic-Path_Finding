# JS-Genetic-Path_Finding
The “Path-finding” project focuses on developing an effective solution through genetic algorithm from proposing a problem doing research to doing varied test cases. This project was built with the p5.js library to implement genetic algorithm and our knowledge of mathematics to develop an application running on the browser to demonstrate as well as visualize our achievement apparently.   

# Summary
Genetic Algorithms are a popular optimisation heuristic based on Charles Darwin’s famous theory of natural selection. This theory suggests that a population will produce offspring that are more adapted to an environment according to natural mutations and characteristics passed on in each generation. The same applies for its implementation in a genetic algorithm.
The following states the process of a genetic algorithm:
1.	Initial population
2.	Fitness function
3.	Selection
4.	Crossover
5.	Mutation

# Initial Population
The first stage the genetic algorithm we need to generate a population of solution/players to test in our environment. This population value will be subject to change through different implementations of a genetic algorithm as the population size determines the range of solutions/players. Although in our solution we have decided to keep the value of populations constant throughout all environment tests in order to achieve a fair comparison between environments.
# Fitness Function
This function is how we quantify the success of the solutions towards our end goal. This function uses the data of each solution to calculate a fitness score for each player. This fitness score will be used to determine which solutions will be selected for reproduction for the next generation.
# Selection
 This selection process assures that each new generation will be inheriting the characteristics of the fittest solutions from a previous generation. Using our fitness function and assigning fitness scores, we can find the solutions that are best suited to pass on their characteristics to the next generation. This process allows us to better optimize our solutions by the method we implement in this selection process as it largely informs how the evolutions of our solutions grow in fitness over generations. 
# Crossover
Once we have selected appropriate solutions, we now need to reproduce new solutions in according to the fittest of the generation. This is the Crossover process which takes two parent-solutions and crosses over its DNA at a random index to create two new child solutions which will both share a part of each parent's DNA.
# Mutation
The mutation process further alters the DNA of the solutions as it introduces randomisation into the new child-solutions. The quantification of mutation is in the form of a mutation rate. This rate defines the occurrence in which a child’s DNA will be randomly altered. Mutation rate is very important in which we can vary the diversity of each generation as to find different ways of achieving our intended goal and avoid a single-minded population. This might seem counter intuitive but is an important step in finding an optimal method for pathfinding. a successful solution might not be the optimal solution to the problem, mutation is a way of using the DNA of previous generations while also adding variance to explore different avenues in the environment. 
# Issue of Optimisation
In the implementation of these genetic algorithm principles we come to the issues with optimising our population in this task. Because of the nature of a genetic algorithm we must carefully chose our variables and methods in order to achieve an optimal result. This includes the design of the algorithm, but it's mostly impacted by the size of the population, selection process and the mutation rate. By studying the algorithm and its application, we can build hypothesises on which variables would to applicable to a preliminary result. We can then generate a series of tests with different variables to try and improve and find an optimal result.
# Finding the Path
We think that a GA is a good way of finding an optimal path between obstacles because it can find solutions and optimisations previously unknown to us. Explicitly programming a pathfinding algorithm in this case would be difficult as obstacles in the environment can lead to low-success rates. For a GA however our solutions can learn over generations while also finding unique paths around obstacles to achieve an optimal result.
# Our Solution
Using these principles of genetic algorithm construction our group will be designing and building a program that will generate a population of solutions within different environments with a goal of traveling from a point A to point B. We think this is a good example of a genetic algorithm as we can easily visualize the progression of the populations over many generations and observe which variables in our tests better-optimises the final solution.
