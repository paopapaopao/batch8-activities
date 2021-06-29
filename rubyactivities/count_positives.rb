def count_of_positives_and_sum_of_negatives(array)
	if (array == nil || array.size == 0)
		return ([])
	else
		count_of_positives = 0
		sum_of_negatives = 0

		array.each do |num|
			if (num > 0)
				count_of_positives += 1
			else
				sum_of_negatives += num
			end
		end

		return ([count_of_positives, sum_of_negatives])
	end
end

array1 = nil
array2 = []
array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -11, -12, -13, -14, -15]

puts count_of_positives_and_sum_of_negatives(array1)
puts count_of_positives_and_sum_of_negatives(array2)
puts count_of_positives_and_sum_of_negatives(array3)