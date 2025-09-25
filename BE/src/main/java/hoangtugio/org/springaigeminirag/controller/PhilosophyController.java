package hoangtugio.org.springaigeminirag.controller;

import hoangtugio.org.springaigeminirag.model.Philosopher;
import hoangtugio.org.springaigeminirag.model.Quote;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/philosophy")
@CrossOrigin(origins = "http://localhost:5173") // Allow Vite dev server
public class PhilosophyController {

    private final List<Philosopher> philosophers = Arrays.asList(
        new Philosopher(1L, "Karl Marx", "1818", "1883", "German",
            "A revolutionary socialist and critic of political economy who analyzed the effects of capitalism and developed the theory of historical materialism.",
            "/philosophers/marx.jpg"),
        new Philosopher(2L, "Vladimir Lenin", "1870", "1924", "Russian", 
            "A revolutionary leader and political theorist who served as the first head of government of Soviet Russia and later the Soviet Union.",
            "/philosophers/lenin.jpg"),
        new Philosopher(3L, "Socrates", "470 BC", "399 BC", "Greek",
            "An ancient Greek philosopher widely credited as the founder of Western philosophy and among the first moral philosophers of the ethical tradition of thought.",
            "/philosophers/socrates.jpg")
    );

    private final List<Quote> quotes = Arrays.asList(
        new Quote(1L, "The philosophers have only interpreted the world in various ways; the point is to change it.", 
            "Karl Marx", "Theses on Feuerbach", "Political Philosophy"),
        new Quote(2L, "Workers of the world unite; you have nothing to lose but your chains.", 
            "Karl Marx", "The Communist Manifesto", "Political Philosophy"),
        new Quote(3L, "The history of all hitherto existing society is the history of class struggles.", 
            "Karl Marx", "The Communist Manifesto", "Political Philosophy"),
        new Quote(4L, "There are decades where nothing happens; and there are weeks where decades happen.", 
            "Vladimir Lenin", "Political Speech", "Political Philosophy"),
        new Quote(5L, "A lie told often enough becomes the truth.", 
            "Vladimir Lenin", "Political Writing", "Political Philosophy"),
        new Quote(6L, "The best way to destroy the capitalist system is to debauch the currency.", 
            "Vladimir Lenin", "Economic Theory", "Political Philosophy"),
        new Quote(7L, "The only true wisdom is in knowing you know nothing.", 
            "Socrates", "Apology", "Epistemology"),
        new Quote(8L, "An unexamined life is not worth living.", 
            "Socrates", "Apology", "Ethics"),
        new Quote(9L, "I cannot teach anybody anything. I can only make them think.", 
            "Socrates", "Dialogues", "Education")
    );

    @GetMapping("/philosophers")
    public List<Philosopher> getAllPhilosophers() {
        return philosophers;
    }

    @GetMapping("/philosophers/{id}")
    public Philosopher getPhilosopher(@PathVariable Long id) {
        return philosophers.stream()
            .filter(p -> p.getId().equals(id))
            .findFirst()
            .orElse(null);
    }

    @GetMapping("/quotes")
    public List<Quote> getAllQuotes() {
        return quotes;
    }

    @GetMapping("/quotes/by-author/{author}")
    public List<Quote> getQuotesByAuthor(@PathVariable String author) {
        return quotes.stream()
            .filter(q -> q.getAuthor().equalsIgnoreCase(author))
            .collect(Collectors.toList());
    }

    @GetMapping("/quotes/featured")
    public List<Quote> getFeaturedQuotes() {
        // Return one quote from each philosopher for the home page
        return Arrays.asList(
            quotes.stream().filter(q -> q.getAuthor().equals("Karl Marx")).findFirst().orElse(null),
            quotes.stream().filter(q -> q.getAuthor().equals("Vladimir Lenin")).findFirst().orElse(null),
            quotes.stream().filter(q -> q.getAuthor().equals("Socrates")).findFirst().orElse(null)
        ).stream().filter(q -> q != null).collect(Collectors.toList());
    }
}