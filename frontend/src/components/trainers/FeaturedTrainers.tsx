import React from 'react';
import { trainerService } from '../../utils/api';
import Link from 'next/link';

const TrainerCard = ({ trainer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative h-48 bg-gray-200">
        {trainer.user.profileImage ? (
          <img 
            src={trainer.user.profileImage} 
            alt={`${trainer.user.firstName} ${trainer.user.lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-indigo-100">
            <span className="text-4xl font-bold text-indigo-300">
              {trainer.user.firstName.charAt(0)}{trainer.user.lastName.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-2 right-2 bg-indigo-600 text-white text-sm px-2 py-1 rounded-full">
          ${trainer.hourlyRate}/hr
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {trainer.user.firstName} {trainer.user.lastName}
        </h3>
        
        <div className="flex items-center mt-1">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < Math.round(trainer.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-1">
            ({trainer.reviewCount} reviews)
          </span>
        </div>
        
        <div className="mt-3">
          <div className="flex flex-wrap gap-1 mb-3">
            {trainer.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded"
              >
                {specialty}
              </span>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {trainer.bio}
          </p>
          
          <Link href={`/trainers/${trainer._id}`}>
            <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeaturedTrainers = () => {
  const [trainers, setTrainers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoading(true);
        const response = await trainerService.getTrainers({ limit: 4 });
        setTrainers(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load trainers');
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Trainers</h2>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Trainers</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Featured Trainers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer._id} trainer={trainer} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link href="/trainers">
            <button className="bg-white text-indigo-600 border border-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition-colors">
              View All Trainers
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrainers;
