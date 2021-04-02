<?php

namespace App\Repository;

use App\DTO\Paginate;
use App\Entity\Customer;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Customer|null find($id, $lockMode = null, $lockVersion = null)
 * @method Customer|null findOneBy(array $criteria, array $orderBy = null)
 * @method Customer[]    findAll()
 * @method Customer[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CustomerRepository extends ServiceEntityRepository
{

    private EntityManagerInterface $manager;

    public function __construct
    (
        ManagerRegistry $registry,
        EntityManagerInterface $manager
    )
    {
        parent::__construct($registry, Customer::class);
        $this->manager = $manager;
    }

    public function findLike($value, $field, $limit, $offset)
    {
        $totalCount = $this->createQueryBuilder('a')
        ->select('count(a.id)')
        ->getQuery()
        ->getSingleScalarResult();

        $qb = $this->createQueryBuilder('customer');
        if ($value && $field) {
            $qb = $this->createQueryBuilder('customer');
            $qb = $qb->where($qb->expr()->orX(
                $qb->expr()->like("lower(customer.$field)", ':value')
            ))
                ->setParameter('value', '%' . strtolower($value) . '%');
        }

        if ($limit && $offset) {
            $qb->setFirstResult($limit * ($offset - 1))
                ->setMaxResults($limit);
            $result = new Paginate($qb->getQuery()->getResult(), $totalCount, $limit, $offset);
            $result = $result->serialize();
        } else {
            $result = $qb->getQuery()->getResult();
        }

        return $result;
    }

    public function saveCustomer(Customer $customer): Customer
    {
        $this->manager->persist($customer);
        $this->manager->flush();

        return $customer;
    }

    public function removeCustomer(Customer $customer)
    {
        $this->manager->remove($customer);
        $this->manager->flush();
    }
}
