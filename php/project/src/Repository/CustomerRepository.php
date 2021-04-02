<?php

namespace App\Repository;

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

    public function findLike(int $limit, int $offset, ?string $value, ?string $field, ?bool $isCntResult = false)
    {
        $qb = $this->createQueryBuilder('customer');
        $expr = $qb->expr();

        if ($isCntResult) {
            $qb = $qb->select('count(customer.id)');
        }

        if ($value && $field) {
            $qb = $qb
                ->where($expr->orX(
                    $expr->like(sprintf('lower(customer.%s)', $field), ':value')
                ))
                ->setParameter('value', '%' . strtolower($value) . '%');
        }

        if ($isCntResult) {
            $qb = $qb->getQuery()->getSingleScalarResult();
        } else {
            $qb = $qb
                ->setFirstResult($limit * ($offset - 1))
                ->setMaxResults($limit)
                ->getQuery()
                ->getResult();
        }

        return $qb;
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
