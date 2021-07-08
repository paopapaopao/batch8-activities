def unique_in_order(sequence)
	if (sequence.class != Array && sequence.class != String)
		return (nil)
	end
	
	array = sequence.class == Array ? sequence : sequence.split('')
	unique = []
	array.each_index do |index|
		if (index == 0 || array[index] != array[index - 1])
			unique << array[index]
		end
	end

	return (unique)
end

p unique_in_order('AAAABBBCCDAABBB')
p unique_in_order('ABBCcAD')
p unique_in_order([1, 2, 2, 3, 3])