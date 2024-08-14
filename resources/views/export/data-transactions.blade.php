<table>
    <thead>
      <tr>
        <th>No</th>
        <th>Kode Transaksi</th>
        <th>NAMA</th>
        <th>NO&nbsp;&nbsp;&nbsp;PONSEL</th>
        <th>Email</th>
        <th>Order</th>
        <th>Kode Referal</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      @foreach ($transactions as $index=>$row)
      <tr>
        <td>{{$index+1}}</td>
        <td>{{!empty($row->transaction_code) ? $row->transaction_code : '-'}}</td>
        <td>{{!empty($row->order->user->name) ? $row->order->user->name : '-'}}</td>
        <td>{{!empty($row->order->user->no_telephone) ? '0'.substr($row->order->user->no_telephone, 2) : '-'}}</td>
        <td>{{!empty($row->order->user->email) ? $row->order->user->email : '-'}}</td>
        <td>{{!empty($row->order->reservation_menu->name) ? $row->order->reservation_menu->name : '-'}}</td>
        <td>{{!empty($row->order->user->referal_code) ? $row->order->user->referal_code : '-'}}</td>
        <td>
            @if ($row->is_active == 1)
                Belum Verifikasi
            @else
                Verfikasi
            @endif
        </td>
      </tr>
      @endforeach
    </tbody>
</table>
