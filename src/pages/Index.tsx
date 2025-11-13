import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Space {
  id: number;
  name: string;
  description: string;
  image: string;
  capacity: number;
  price: number;
  amenities: string[];
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const spaces: Space[] = [
  {
    id: 1,
    name: 'Коворкинг Лофт',
    description: 'Светлое пространство с панорамными окнами для продуктивной работы',
    image: 'https://cdn.poehali.dev/projects/8e94811b-c43d-4ee6-9dd2-eae35d78235b/files/7a9e6c06-eea7-4b0d-83de-a7e896722d04.jpg',
    capacity: 20,
    price: 500,
    amenities: ['Wi-Fi', 'Кофе', 'Принтер']
  },
  {
    id: 2,
    name: 'Арт-студия',
    description: 'Творческое пространство с высокими потолками для художников',
    image: 'https://cdn.poehali.dev/projects/8e94811b-c43d-4ee6-9dd2-eae35d78235b/files/77a33e8d-dbed-4394-8b2e-c6b761e494b8.jpg',
    capacity: 15,
    price: 800,
    amenities: ['Мольберты', 'Освещение', 'Материалы']
  },
  {
    id: 3,
    name: 'Музыкальная студия',
    description: 'Профессиональная студия звукозаписи с современным оборудованием',
    image: 'https://cdn.poehali.dev/projects/8e94811b-c43d-4ee6-9dd2-eae35d78235b/files/0cb2079f-7295-4edb-8df6-2add3e0c4979.jpg',
    capacity: 8,
    price: 1500,
    amenities: ['Микрофоны', 'Микшер', 'Звукоизоляция']
  }
];

const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '11:00', available: true },
  { time: '13:00', available: false },
  { time: '15:00', available: true },
  { time: '17:00', available: true },
  { time: '19:00', available: false },
];

export default function Index() {
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleBooking = () => {
    if (selectedSpace && selectedDate && selectedTime) {
      alert(`Бронирование успешно!\n\nПространство: ${selectedSpace.name}\nДата: ${selectedDate.toLocaleDateString('ru-RU')}\nВремя: ${selectedTime}\nСтоимость: ${selectedSpace.price}₽/час`);
      setIsBookingOpen(false);
      setSelectedTime(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-purple-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Creative Spaces
            </h1>
            <div className="flex gap-4">
              <Button variant="ghost" className="gap-2">
                <Icon name="Calendar" size={20} />
                Мои бронирования
              </Button>
              <Button variant="default" className="gap-2">
                <Icon name="User" size={20} />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Найди своё креативное пространство
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Вдохновляющие места для работы, творчества и самовыражения
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {spaces.map((space, index) => (
            <Card 
              key={space.id} 
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-scale-in border-2 border-purple-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={space.image} 
                  alt={space.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-primary text-white font-semibold px-4 py-2 text-lg">
                    {space.price}₽/час
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{space.name}</CardTitle>
                <CardDescription className="text-base">{space.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Users" size={18} />
                    <span>До {space.capacity} человек</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {space.amenities.map((amenity) => (
                    <Badge key={amenity} variant="secondary" className="text-sm">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Dialog open={isBookingOpen && selectedSpace?.id === space.id} onOpenChange={(open) => {
                  setIsBookingOpen(open);
                  if (open) setSelectedSpace(space);
                }}>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full gap-2 text-lg py-6 bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                      onClick={() => setSelectedSpace(space)}
                    >
                      <Icon name="Calendar" size={20} />
                      Забронировать
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">{space.name}</DialogTitle>
                      <DialogDescription>
                        Выберите дату и время для бронирования
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid md:grid-cols-2 gap-8 py-6">
                      <div>
                        <h3 className="font-semibold mb-4 text-lg">Выберите дату</h3>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          className="rounded-md border border-purple-200"
                          disabled={(date) => date < new Date()}
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-4 text-lg">Выберите время</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {timeSlots.map((slot) => (
                            <Button
                              key={slot.time}
                              variant={selectedTime === slot.time ? "default" : "outline"}
                              disabled={!slot.available}
                              onClick={() => setSelectedTime(slot.time)}
                              className="h-16 text-lg"
                            >
                              <Icon name="Clock" size={18} className="mr-2" />
                              {slot.time}
                            </Button>
                          ))}
                        </div>
                        {selectedDate && selectedTime && (
                          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-2 border-primary">
                            <h4 className="font-bold text-lg mb-3">Детали бронирования</h4>
                            <div className="space-y-2 text-sm">
                              <p><strong>Дата:</strong> {selectedDate.toLocaleDateString('ru-RU')}</p>
                              <p><strong>Время:</strong> {selectedTime}</p>
                              <p><strong>Стоимость:</strong> {space.price}₽/час</p>
                            </div>
                            <Button 
                              className="w-full mt-4 bg-gradient-to-r from-primary to-secondary"
                              onClick={handleBooking}
                            >
                              Подтвердить бронирование
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        <section className="bg-white rounded-3xl p-12 shadow-xl border-2 border-purple-100 animate-fade-in">
          <div className="text-center">
            <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Почему выбирают нас?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary text-white mb-4">
                  <Icon name="Sparkles" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Вдохновляющая атмосфера</h4>
                <p className="text-muted-foreground">
                  Дизайнерские пространства, созданные для творчества
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-secondary to-accent text-white mb-4">
                  <Icon name="Zap" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Мгновенное бронирование</h4>
                <p className="text-muted-foreground">
                  Забронируйте пространство за несколько кликов
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-accent to-primary text-white mb-4">
                  <Icon name="Heart" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-2">Комьюнити единомышленников</h4>
                <p className="text-muted-foreground">
                  Знакомьтесь с креативными людьми и развивайтесь вместе
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <footer className="bg-white border-t border-purple-100 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 Creative Spaces. Вдохновляем на творчество каждый день.</p>
        </div>
      </footer>
    </div>
  );
}
