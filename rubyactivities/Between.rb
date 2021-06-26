puts "Enter a number: "
num = gets.to_i

if num < 0
    puts "#{num} is less than 0"
elsif num >= 0 && num <= 50
    puts "#{num} is between 0 and 50"
elsif num >= 51 && num <= 100
    puts "#{num} is between 51 and 100"
else
    puts "#{num} is greater than 100"
end