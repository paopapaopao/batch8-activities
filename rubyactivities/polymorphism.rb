class Animal
	def move
		puts "I am moving"
	end

	def baliktarin(enum)
		p enum.reverse
	end
end

class Fish < Animal
	def move
		puts "I am moving by swimming"
	end
end

class Sample
	def reverse
		return ("Baliktad")
	end
end

animal = Animal.new()
fish = Fish.new()

puts "Polymorphism by Inheritance"
animal.move()
fish.move()

sample = Sample.new()
array = [1, 2, 3, 4, 5, 6, 7]
string = "Hello, World!"

puts "Polymorphism by Duck-typing"
animal.baliktarin(sample)
animal.baliktarin(array)
animal.baliktarin(string)