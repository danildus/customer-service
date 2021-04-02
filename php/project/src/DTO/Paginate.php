<?php

namespace App\DTO;

class Paginate
{
    private array $items;
    private int $totalItemCount;
    private int $itemNumberPerPage;
    private int $currentPage;
    private int $totalPageCount;

    public function __construct(
        array $items,
        int $totalItemCount,
        int $itemNumberPerPage,
        int $currentPage
    )
    {
        $this->items             = $items;
        $this->totalItemCount    = $totalItemCount;
        $this->itemNumberPerPage = $itemNumberPerPage;
        $this->currentPage       = $currentPage;
        $this->totalPageCount    = $itemNumberPerPage ? (int) ceil($totalItemCount / $itemNumberPerPage) : 1;
    }

    public function getItems(): array
    {
        return $this->items;
    }

    public function getTotalItemCount(): int
    {
        return $this->totalItemCount;
    }

    public function getItemNumberPerPage(): int
    {
        return $this->itemNumberPerPage;
    }

    public function getCurrentPage(): int
    {
        return $this->currentPage;
    }

    public function getTotalPageCount(): int
    {
        return $this->totalPageCount;
    }

    public function serialize(): array
    {
        return [
            'items'             => $this->getItems(),
            'totalItemCount'    => $this->getTotalItemCount(),
            'itemNumberPerPage' => $this->getItemNumberPerPage(),
            'currentPage'       => $this->getCurrentPage(),
            'totalPageCount'    => $this->getTotalPageCount(),
        ];
    }
}