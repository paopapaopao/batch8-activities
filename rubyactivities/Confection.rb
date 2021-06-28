class Confection
    def prepare()
        return ("Baking at 350 degrees for 25 minutes.")
    end
end

class Cupcake < Confection
    def prepare()
        return (super + " Applying frosting.")
    end
end

class BananaCake < Confection
end

cup_cake = Cupcake.new()
banana_cake = BananaCake.new()

puts("Cupcake:\t" + cup_cake.prepare())
puts("Banana cake:\t" + banana_cake.prepare())
