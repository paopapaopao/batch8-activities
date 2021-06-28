class Confection
    def bake()
        return ("Baking at 350 degrees for 25 minutes.")
    end
end

class Cupcake < Confection
    def bake()
        return (super + " Applying frosting.")
    end
end

class BananaCake < Confection
end

cup_cake = Cupcake.new()
banana_cake = BananaCake.new()

puts("Cupcake:\t" + cup_cake.bake())
puts("Banana cake:\t" + banana_cake.bake())