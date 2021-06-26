def is_square(x)
	if x < 0
		return false
	end

	for i in 0..x
		if i * i == x
			return true
		end
	end
	return false
end

puts "-1: #{is_square(-1)}"
puts "0: #{is_square(0)}"
puts "3: #{is_square(3)}"
puts "4: #{is_square(4)}"
puts "25: #{is_square(25)}"
puts "26: #{is_square(26)}"